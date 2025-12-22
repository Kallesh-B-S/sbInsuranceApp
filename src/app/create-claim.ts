import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { environment } from "../environments/environment";
import { tap } from "rxjs";

// Define an interface for the Claim Request
export interface ClaimRequest {
  policyId: string;
  customerId: number;
  amount: number;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class CreateClaim {
  private http = inject(HttpClient);

  submitClaim(claim: ClaimRequest) {
    // Note: ensure this URL matches your backend endpoint
    return this.http.post(`${environment.claimApiUrl}/claim`, claim).pipe(
      tap(response => console.log('Claim submitted successfully:', response))
    );
  }
}