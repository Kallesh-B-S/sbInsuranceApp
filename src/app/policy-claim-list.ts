import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

export interface Claim {
  id: number;
  policyId: number,
  customerId: number,
  claimNumber: String;
  requestedAmount: number;
  incidentDate: string;
  description: string;
  status: string;
  remarks: string;
}

@Injectable({
  providedIn: 'root',
})
export class PolicyClaimList {
  private http = inject(HttpClient);

  // Initialize as an empty array [] instead of null for easier UI loops
  currentPolicyClaims = signal<Claim[]>([]);

  fetchAllClaimsByPolicyId(policyId: string) {
    // Note: The generic type here is now Policy[]
    return this.http.get<Claim[]>(`${environment.claimApiUrl}/claim/policy/` + policyId).pipe(
      tap(claims => {
        console.log('Policies successfully fetched:', claims);
        this.currentPolicyClaims.set(claims);
      })
    );
  }

  clearPolicyClaims() {
    this.currentPolicyClaims.set([]);
  }
}
