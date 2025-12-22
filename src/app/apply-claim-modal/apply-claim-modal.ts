import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-apply-claim-modal',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './apply-claim-modal.html',
  styleUrls: ['./apply-claim-modal.css']
})
export class ApplyClaimModal {
  // Form Model
  claimData = {
    requestedAmount: null,
    description: ''
  };

  constructor(
    public dialogRef: MatDialogRef<ApplyClaimModal>,
    @Inject(MAT_DIALOG_DATA) public data: { policyNumber: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.claimData.requestedAmount && this.claimData.description) {
      // Return data to the parent component
      this.dialogRef.close({
        policyId: this.data.policyNumber,
        ...this.claimData
      });
    }
  }
}