import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

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
  protected id = signal(this.route.snapshot.params['id']);

  // Method to handle UI actions
  contactAdjuster() {
    console.log('Initiating contact for claim:', this.id());
  }
}