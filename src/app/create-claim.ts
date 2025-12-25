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

  // submitClaim(claim: ClaimRequest) {
  //   // Note: ensure this URL matches your backend endpoint
  //   return this.http.post(`${environment.claimApiUrl}/claim`, claim).pipe(
  //     tap(response => console.log('Claim submitted successfully:', response))
  //   );
  // }

  submitClaim(claim: any) {
    const formData = new FormData();

    // Create the request body object without the images
    const requestBody = {
      policyId: claim.policyId,
      customerId: claim.customerId,
      requestedAmount: claim.requestedAmount,
      description: claim.description,
      incidentDate: claim.incidentDate
    };

    // 1. Add the JSON data as a Blob
    formData.append('requestBody', new Blob([JSON.stringify(requestBody)], {
      type: 'application/json'
    }));

    // 2. Add the images
    if (claim.images && claim.images.length > 0) {
      claim.images.forEach((file: File) => {
        formData.append('images', file, file.name);
      });
    }

    return this.http.post(`${environment.claimApiUrl}/claim`, formData).pipe(
      tap(response => console.log('Claim submitted successfully:', response))
    );
  }

  addImages(files: File[], claimId: string) {
    const formData = new FormData();

    // 'files' is the array passed from the modal
    if (files && files.length > 0) {
      files.forEach((file: File) => {
        // The key 'images' must match your Spring Boot @RequestParam("images")
        formData.append('images', file, file.name);
      });
    }

    // Ensure claimId is valid before sending
    return this.http.post(`${environment.claimApiUrl}/claim/addImages/${claimId}`, formData).pipe(
      tap(response => console.log('Images uploaded successfully:', response))
    );
  }
}