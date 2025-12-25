import { Component, signal, computed, inject } from '@angular/core'; // Added inject
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Added Dialog imports
import { ApplyClaimModal } from '../apply-claim-modal/apply-claim-modal';
import { PolicyList } from '../policy-list';
import { CreateClaim } from '../create-claim';
import { UserService } from '../customer-profile';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,
    RouterModule,
    MatDialogModule // Add this to imports
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private dialog = inject(MatDialog); // Modern way to inject service in Standalone


  private userService = inject(UserService);
  user = this.userService.currentUser();

  private createClaim = inject(CreateClaim)

  private policyList = inject(PolicyList);
  policies = this.policyList.currentPolicies;

  ngOnInit() {
    const user = this.userService.currentUser();

    if (!user) {
      return;
    }

    this.policyList.fetchAllPolicies(user.id).subscribe();
  }


  protected readonly title = signal('SHIELD');

  policyColumns: string[] = [
    'policyNumber',
    'policyName',
    // 'automobileID', 
    'premiumAmount',
    // 'premiumFrequency',
    'coverageAmount',
    'status',
    "actions"];

  // policies = signal([
  //   {
  //     "policyNumber": "POLTX001",
  //     "policyName": "Comprehensive Auto Plan",
  //     "automobileID": 1,
  //     "premiumAmount": 1200.00,
  //     "coverageAmount": 800.00,
  //     "status": "ACTIVE"
  //   },
  //   {
  //     "policyNumber": "POLHN003",
  //     "policyName": "Basic Liability Plan",
  //     "automobileID": 2,
  //     "premiumAmount": 1000.00,
  //     "coverageAmount": 700.00,
  //     "status": "ACTIVE"
  //   }
  // ]);

  planFilter = signal('');
  statusFilter = signal('');

  filteredPolicies = computed(() => {
    const plan = this.planFilter().toLowerCase();
    const status = this.statusFilter();

    return this.policies().filter(p => {
      const matchesPlan = p.policyName.toLowerCase().includes(plan);
      const matchesStatus = status === '' || p.status.toLowerCase() === status.toLowerCase();
      return matchesPlan && matchesStatus;
    });
  });

  applyFilter(event: Event, type: 'plan' | 'status') {
    const value = (event.target as HTMLInputElement | HTMLSelectElement).value;
    if (type === 'plan') this.planFilter.set(value);
    if (type === 'status') this.statusFilter.set(value);
  }

  // --- NEW METHOD TO OPEN MODAL ---
  openApplyClaimModal(policy: any) {
    const dialogRef = this.dialog.open(ApplyClaimModal, {
      width: '500px',
      maxWidth: '95vw',
      data: { 
        policyNumber: policy.id,
        startDate: policy.startDate
      },
      panelClass: 'shield-dialog-overlay'
    });

    dialogRef.afterClosed().subscribe(result => {
      // 'result' contains the { policyId, amount, description } from your modal
      if (result) {
        console.log("data from modal : ", result);

        result = { ...result, customerId: this.user?.id }
        this.createClaim.submitClaim(result).subscribe({
          next: (res) => {
            alert('Claim submitted successfully!');
            // Optional: refresh your policy list if the status changed
            // this.policyList.fetchAllPolicies().subscribe();
          },
          error: (err) => {
            console.error('Error submitting claim:', err);
            // console.log(err.status);
            // console.log(err.error);

            if (err.status === 400) {
              alert("Bad Request")
            }
            else {
              alert("Failed to Submit Claim")
            }
          }
        });
      }
    });
  }
}
