import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { PolicyData } from '../policy-data';

// 1. Define the shapes of your data
// interface PreviousInsurance {
//   company: string;
//   lastClaimAmount: number;
//   policyExpired: string;
// }

// interface PolicyData {
//   policy: {
//     policyNumber: string;
//     policyName: string;
//     premiumAmount: number;
//     coverageAmount: number;
//     startDate: string;
//     endDate: string;
//     status: string;
//   };
//   automobile: {
//     id: number;
//     make: string;
//     made: string;
//     year: string;
//     // 2. Tell TS this can be the object OR null
//     previousInsurance: PreviousInsurance | null;
//   };
// }

@Component({
  selector: 'app-policy-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './policy-detail.html',
  styleUrl: './policy-detail.css'
})
export class PolicyDetail {
  private route = inject(ActivatedRoute);
  private policyData = inject(PolicyData);

  data = this.policyData.currentPolicyDetail;

  policyId = signal<string | null>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.policyId.set(id);
    this.policyData.fetchPolicyDetail(this.policyId() ?? "").subscribe();
  }

  // Data signal initialized with your mock data
  // readonly data = signal<PolicyData>({
  //   "policy": {
  //     "policyNumber": "9eeacd2756a5434290670b7ddaac8e32",
  //     "policyName": "Comprehensive Auto Plan",
  //     "premiumAmount": 1200.00,
  //     "coverageAmount": 50000.00,
  //     "startDate": "2025-12-20",
  //     "endDate": "2026-12-20",
  //     "status": "ACTIVE"
  //   },
  //   "automobile": {
  //     "id": 1,
  //     "make": "Bayerische Motoren Werke",
  //     "made": "Individual M8 Competition Gran Coupe",
  //     "year": "2025",
  //     // "previousInsurance": null,
  //     "previousInsurance":
  //     {
  //       "company": "Northwestern Mutual Life & Casualty Insurance Group",
  //       "lastClaimAmount": 500.0,
  //       "policyExpired": "2023-01-10"
  //     }
  //   }
  // });

  // Example method for the download button
  downloadDocs() {
    console.log('Downloading documents for:', this.data()?.policy.policyNumber);
  }
}