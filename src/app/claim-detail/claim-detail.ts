import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { ClaimData } from '../claim-data';


interface GalleryImage {
  url: string;
  name: string;
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


  // Signal for the Claim ID from the URL
  // protected id = signal(this.route.snapshot.params['id']);

  private claimData = inject(ClaimData);

  // data = this.claimData.activeClaim;

  // claimId = signal<string | null>(null);

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id');
  //   this.claimId.set(id);
  //   this.claimData.getClaimById(this.claimId() ?? "").subscribe();
  // }

  data() {
    return {
      "id": 1,
      "policyId": 1,
      "customerId": 1,
      "claimNumber": "CLM-1",
      "requestedAmount": 400,
      "description": "Claim description 3",
      "incidentDate": "2025-12-22",
      "status": "SUBMITTED",
      "remarks": "Claim Submitted"
    }
  }

  // Method to handle UI actions
  contactAdjuster() {
    // console.log('Initiating contact for claim:', this.id());
  }


  // gal 

  images = signal<GalleryImage[]>([
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p1.jpg", name: "p1" },
    { url: "/proofImages/claim/clm1/p2.png", name: "p1" }
  ]);

  viewImage(url: string) {
    if (!url) return;
    window.open(url, '_blank');
  }

  // downloadImage(url: string, fileName: string) {
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = fileName;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // }

  async downloadImage(url: string, fileName: string) {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = objectUrl;
      link.download = fileName || 'download';
      link.click();

      window.URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.error('Download failed', err);
    }
  }
}