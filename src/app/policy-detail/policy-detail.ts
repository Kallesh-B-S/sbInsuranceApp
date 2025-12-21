import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-policy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './policy-detail.html',
  styleUrl: './policy-detail.css'
})
export class PolicyDetail {
  private route = inject(ActivatedRoute);

  // Data signal initialized with your mock data
  readonly data = signal({
    "policy": {
      "policyNumber": "9eeacd2756a5434290670b7ddaac8e32",
      "policyName": "Comprehensive Auto Plan",
      "premiumAmount": 1200.00,
      "coverageAmount": 50000.00,
      "startDate": "2025-12-20",
      "endDate": "2026-12-20",
      "status": "ACTIVE"
    },
    "automobile": {
      "id": 1,
      "make": "Camry",
      "year": "2020",
      "previousInsurance": {
        "company": "Geico",
        "lastClaimAmount": 500.0,
        "policyExpired": "2023-01-10"
      }
    }
  });

  // Example method for the download button
  downloadDocs() {
    console.log('Downloading documents for:', this.data().policy.policyNumber);
  }
}