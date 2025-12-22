import { Component, signal, computed, inject } from '@angular/core'; // Added inject
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog'; // Added Dialog imports
import { ApplyClaimModal } from '../apply-claim-modal/apply-claim-modal';

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
  
  protected readonly title = signal('SHIELD');

  policyColumns: string[] = ['policyNumber', 'policyName', 'automobileID', 'premiumAmount', 'status', "actions"];

  policies = signal([
    {
      "policyNumber": "POLTX001",
      "policyName": "Comprehensive Auto Plan",
      "automobileID": 1,
      "premiumAmount": 1200.00,
      "status": "ACTIVE"
    },
    {
      "policyNumber": "POLHN003",
      "policyName": "Basic Liability Plan",
      "automobileID": 2,
      "premiumAmount": 800.00,
      "status": "ACTIVE"
    }
  ]);

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
      data: { policyNumber: policy.policyNumber },
      panelClass: 'shield-dialog-overlay' 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Claim Submission Received:', result);
        // Here you would typically call a service to save the claim
      }
    });
  }
}