import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ClaimData } from '../claim-data';
import { environment } from '../../environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { AddClaimImages } from '../add-claim-images/add-claim-images';
import { CreateClaim } from '../create-claim';
import { UserService } from '../customer-profile';
import { lastValueFrom, switchMap } from 'rxjs';


interface GalleryImage {
  url: string;
}

@Component({
  selector: 'app-claim-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIconModule],
  templateUrl: './claim-detail.html',
  styleUrl: './claim-detail.css'
})
export class ClaimDetail {
  private route = inject(ActivatedRoute);

  private userService = inject(UserService);
  userRole = this.userService.userRole();
  userData = this.userService.currentUser();


  // Signal for the Claim ID from the URL
  // protected id = signal(this.route.snapshot.params['id']);

  private claimData = inject(ClaimData);

  data = this.claimData.activeClaim;

  policyData = this.claimData.activeClaimPolicyData();

  claimId = signal<string | null>(null);

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.claimId.set(id);
  //   this.claimData.getClaimById(this.claimId() ?? "").subscribe();
  //   this.claimData.fetchPolicyDetailForClaim(`${this.data()?.policyId ?? ""}`).subscribe();
  // }

  async getClaimData() {
  }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.claimId.set(id);
    this.claimData.getClaimById(this.claimId() ?? "").subscribe();

    await lastValueFrom(
      this.claimData.getClaimById(this.claimId() ?? "")
    );
    // await this.getClaimData();

    console.log("policyID is : --------- ", this.data()?.policyId);
    await lastValueFrom(
      this.claimData.fetchPolicyDetailForClaim(`${this.data()?.policyId ?? ""}`)
    )
  }



  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.claimId.set(id);

  //   // 1. Start with the first call
  //   this.claimData.getClaimById(this.claimId() ?? "").pipe(
  //     switchMap((claimResponse) => {
  //       console.log("hello while loading .... ");

  //       // 2. This code runs ONLY after getClaimById finishes.
  //       // 3. Extract the policyId from the response (adjust 'policyId' to match your actual API object key)
  //       const policyId = claimResponse?.policyId ?? "";

  //       // 4. Return the second observable to "switch" to it
  //       return this.claimData.fetchPolicyDetailForClaim(String(policyId));
  //     })
  //   ).subscribe({
  //     next: (policyDetail) => {
  //       // 5. This will finally contain the data from the policy detail call
  //       console.log('Policy Details Loaded:', policyDetail);
  //     },
  //     error: (err) => {
  //       console.error('Error in the sequence:', err);
  //     }
  //   });
  // }

  // data() {
  //   return {
  //     "id": 1,
  //     "policyId": 1,
  //     "customerId": 1,
  //     "claimNumber": "CLM-1",
  //     "requestedAmount": 400,
  //     "description": "Claim description 3",
  //     "incidentDate": "2025-12-22",
  //     "status": "SUBMITTED",
  //     "remarks": "Claim Submitted"
  //   }
  // }

  // Method to handle UI actions
  contactAdjuster() {
    // console.log('Initiating contact for claim:', this.id());
  }


  // gal 

  images = signal<GalleryImage[]>([
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p1.jpg" },
    { url: "/proofImages/claim/clm1/p2.png" }
  ]);

  baseUrl = environment.claimApiUrl + "/"

  viewImage(url: string) {
    if (!url) return;
    window.open(this.baseUrl + url, '_blank');
  }

  onFileSelected() { }

  // downloadImage(url: string, fileName: string) {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  async downloadImage(url: string) {
    // async downloadImage(url: string, fileName: string) {
    try {
      const response = await fetch(this.baseUrl + url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      // link.download = fileName || 'download';
      link.download = 'download';
      link.click();

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Download failed', err);
    }
  }


  private dialog = inject(MatDialog);
  private createClaim = inject(CreateClaim)

  openAddImagesModal() {
    const dialogRef = this.dialog.open(AddClaimImages, {
      data: { claimId: 1 },
      panelClass: 'custom-dialog-container' // Optional: ensure your modal doesn't have white borders
    });

    dialogRef.afterClosed().subscribe((files => {
      if (files && files.length > 0) {
        // this.uploadFilesToService(files);

        this.createClaim.addImages(files, this.claimId() ?? "").subscribe({
          next: (res) => {
            alert('Images added successfully!');
            // Optional: refresh your policy list if the status changed
            // this.policyList.fetchAllPolicies().subscribe();
            this.claimData.getClaimById(this.claimId() ?? "").subscribe();
          },
          error: (err) => {
            console.error('Error submitting claim:', err);
            // console.log(err.status);
            // console.log(err.error);

            if (err.status === 400) {
              alert("Bad Request")
            }
            else {
              alert("Failed to Submit Claim")
            }
          }
        });
      }
    }));
  }
}