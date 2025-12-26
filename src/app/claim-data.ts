import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Claim {
  id: number;
  policyId: number;
  customerId: number;
  claimNumber: string;
  requestedAmount: number;
  approvedAmount: number;
  description: string;
  incidentDate: string;
  status: 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'PENDING'; // Using a union type for better safety
  remarks: string;
  images: [];
}


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
  licensePlateNumber: string;
  vehicleIdentificationNumber: string,
  previousInsurance: PreviousInsurance | null; // Handle potential nulls
}

export interface PolicyDetails {
  id: number;
  policyNumber: string;
  policyName: string;
  automobileID: number;
  customerId: number;
  premiumAmount: number;
  premiumFrequency: string,
  coverageAmount: number;
  startDate: string;
  endDate: string;
  renewalDate: string,
  status: string;
}

export interface PolicyResponse {
  policy: PolicyDetails;
  automobile: Automobile;
}

@Injectable({
  providedIn: 'root',
})
export class ClaimData {
  private http = inject(HttpClient);

  // Signal to store claims list
  claims = signal<Claim[]>([]);

  // Signal to store a single active claim detail
  activeClaim = signal<Claim | null>(null);

  activeClaimPolicyData = signal<PolicyResponse | null>(null);

  /**
   * Fetch all claims for a specific customer
   */
  getClaimsByCustomer(customerId: number) {
    return this.http.get<Claim[]>(`${environment.policyApiUrl}/claims/customer/${customerId}`)
      .pipe(
        tap(data => this.claims.set(data))
      );
  }

  fetchPolicyDetailForClaim(policyId: string) {
    const url = `${environment.policyApiUrl}/policy/${policyId}/automobile`;

    return this.http.get<PolicyResponse>(url).pipe(
      tap((response) => {
        console.log('Detail fetched:', response);
        this.activeClaimPolicyData.set(response);
      })
    );
  }

  /**
   * Fetch a single claim by its ID
   */
  getClaimById(claimId: string) {
    return this.http.get<Claim>(`${environment.claimApiUrl}/claim/${claimId}`)
      .pipe(
        tap(data => this.activeClaim.set(data))
      );
  }

  clearActiveClaim() {
    this.activeClaim.set(null);
  }
}