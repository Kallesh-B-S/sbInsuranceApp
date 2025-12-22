import { Injectable, signal, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { tap } from 'rxjs';

export interface Policy {
  id: number;
  policyNumber: string,
  policyName: string,
  automobileID: number,
  customerId: number,
  premiumAmount: number,
  coverageAmount: number,
  startDate: string,
  endDate: string,
  status: string
}

@Injectable({
  providedIn: 'root',
})
export class PolicyList { // Renamed for clarity (Service vs List)
  private http = inject(HttpClient);

  // Initialize as an empty array [] instead of null for easier UI loops
  currentPolicies = signal<Policy[]>([]);

  fetchAllPolicies(userId: number) {
    // Note: The generic type here is now Policy[]
    return this.http.get<Policy[]>(`${environment.policyApiUrl}/policy/customer/${userId}`).pipe(
      tap(policies => {
        console.log('Policies successfully fetched:', policies);
        this.currentPolicies.set(policies);
      })
    );
  }

  clearPolicies() {
    this.currentPolicies.set([]);
  }
}
