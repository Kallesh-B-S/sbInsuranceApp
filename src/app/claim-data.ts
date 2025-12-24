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
  images:[];
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

  /**
   * Fetch all claims for a specific customer
   */
  getClaimsByCustomer(customerId: number) {
    return this.http.get<Claim[]>(`${environment.policyApiUrl}/claims/customer/${customerId}`)
      .pipe(
        tap(data => this.claims.set(data))
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