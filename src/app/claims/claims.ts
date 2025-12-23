import { Component, signal, computed, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { PolicyClaimList } from '../policy-claim-list';

@Component({
  selector: 'app-claims',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, RouterModule],
  templateUrl: './claims.html',
  styleUrl: './claims.css' // Reuse your existing dashboard.css
})
export class Claims {

  // constructor(private location: Location) {}

  goBack() {
    // this.location.back();
  }

  claimColumns: string[] = [
    'claimId',
    // 'policyNumber', 
    'claimAmount',
    'incidentDate',
    'claimStatus',
    'remarks'
    // 'actions'
  ];
  statusFilter = signal('');

  private policyClaimList = inject(PolicyClaimList);
  claims = this.policyClaimList.currentPolicyClaims;

  private route = inject(ActivatedRoute);

  policyId = signal<string | null>(null);

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');
    this.policyId.set(id);

    this.policyClaimList.fetchAllClaimsByPolicyId(this.policyId() ?? "").subscribe();
    console.log(this.policyClaimList.currentPolicyClaims());
  }

  // claims = signal([
  //   { "claimId": "CLM-9901", "policyNumber": "POL-TX001", "claimAmount": 4500.00, "claimStatus": "PAID" },
  //   { "claimId": "CLM-8822", "policyNumber": "POL-TS004", "claimAmount": 1200.00, "claimStatus": "PENDING" },
  //   { "claimId": "CLM-1022", "policyNumber": "POL-UK022", "claimAmount": 850.00, "claimStatus": "PAID" }
  // ]);

  filteredClaims = computed(() => {
    const status = this.statusFilter();
    if (!status) return this.claims();
    return this.claims().filter(c => c.status === status);
  });

  applyStatusFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilter.set(value);
  }
}