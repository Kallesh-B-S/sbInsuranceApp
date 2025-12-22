import { Component, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

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

  claimColumns: string[] = ['claimId', 'policyNumber', 'claimAmount', 'claimStatus', 'actions'];
  statusFilter = signal('');

  claims = signal([
    { "claimId": "CLM-9901", "policyNumber": "POL-TX001", "claimAmount": 4500.00, "claimStatus": "PAID" },
    { "claimId": "CLM-8822", "policyNumber": "POL-TS004", "claimAmount": 1200.00, "claimStatus": "PENDING" },
    { "claimId": "CLM-1022", "policyNumber": "POL-UK022", "claimAmount": 850.00, "claimStatus": "PAID" }
  ]);

  filteredClaims = computed(() => {
    const status = this.statusFilter();
    if (!status) return this.claims();
    return this.claims().filter(c => c.claimStatus === status);
  });

  applyStatusFilter(event: Event) {
    const value = (event.target as HTMLSelectElement).value;
    this.statusFilter.set(value);
  }
}