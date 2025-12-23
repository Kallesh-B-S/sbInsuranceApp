import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface PreviousInsurance {
  company: string;
  lastClaimAmount: number;
  currency: string;
  policyExpired: string;
}

export interface Automobile {
  id: number;
  customerId: number;
  make: string;
  made: string;
  year: string;
  previousInsurance: PreviousInsurance | null; // Handle potential nulls
}

export interface PolicyDetails {
  id: number;
  policyNumber: string;
  policyName: string;
  automobileID: number;
  customerId: number;
  premiumAmount: number;
  coverageAmount: number;
  startDate: string;
  endDate: string;
  status: string;
}

export interface PolicyResponse {
  policy: PolicyDetails;
  automobile: Automobile;
}

@Injectable({
  providedIn: 'root',
})
export class PolicyData {
  private http = inject(HttpClient);

  // Signal to hold the current detailed view of a policy
  // We initialize as null because a single detail view usually starts empty
  currentPolicyDetail = signal<PolicyResponse | null>(null);

  /**
   * Fetch specific policy details by ID
   * @param policyId The ID of the policy to retrieve
   */
  fetchPolicyDetail(policyId: string) {
    const url = `${environment.policyApiUrl}/policy/${policyId}/automobile`;

    return this.http.get<PolicyResponse>(url).pipe(
      tap((response) => {
        console.log('Detail fetched:', response);
        this.currentPolicyDetail.set(response);
      })
    );
  }

  clearDetail() {
    this.currentPolicyDetail.set(null);
  }
}