import { Component, inject, Inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AddClaimImages } from '../add-claim-images/add-claim-images';

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
  providers: [DatePipe],
  templateUrl: './apply-claim-modal.html',
  styleUrls: ['./apply-claim-modal.css']
})
export class ApplyClaimModal {


  // Form Model
  claimData = {
    requestedAmount: null,
    description: '',
    incidentDate: ""
  };

  today: string = new Date().toISOString().split('T')[0];

  constructor(
    private datePipe: DatePipe,
    public dialogRef: MatDialogRef<ApplyClaimModal>,
    @Inject(MAT_DIALOG_DATA) public data: { policyNumber: string, startDate: string }
  ) { }

  onCancel(): void {
    this.dialogRef.close();
  }

  // onSubmit(): void {
  //   if (this.claimData.requestedAmount && this.claimData.description && this.claimData.incidentDate) {
  //     // Return data to the parent component
  //     this.dialogRef.close({
  //       policyId: this.data.policyNumber,
  //       ...this.claimData,
  //       incidentDate: this.datePipe.transform(this.claimData.incidentDate, 'dd-MM-yyyy')
  //     });
  //   }
  // }

  // Add these properties to your class
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  // onFileSelected(event: any): void {
  //   const files = event.target.files;
  //   if (files) {
  //     for (let file of files) {
  //       // Basic validation
  //       const reader = new FileReader();
  //       reader.onload = (e: any) => {
  //         this.previewUrls.push(e.target.result);
  //         this.selectedFiles.push(file);
  //       };
  //       reader.readAsDataURL(file);
  //     }
  //   }
  // }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files) return;

    // Convert FileList to Array to iterate
    Array.from(files).forEach(file => {
      // 1. Check if the file (by name and size) already exists in our list
      const isDuplicate = this.selectedFiles.some(
        exists => exists.name === file.name && exists.size === file.size
      );

      if (isDuplicate) {
        console.warn(`${file.name} is already added.`);
        return; // Skip this file
      }

      // 2. If not a duplicate, process it
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewUrls.push(e.target.result);
        this.selectedFiles.push(file);
      };
      reader.readAsDataURL(file);
    });

    // 3. CRITICAL: Reset the input value
    // This allows the (change) event to fire even if you pick the same file again
    event.target.value = '';
  }

  removeImage(index: number, event: MouseEvent): void {
    event.stopPropagation(); // Prevent triggering the file input click
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  // Logic to check if the date is within range
  isDateInvalid(): boolean {
    const selected = this.claimData.incidentDate;
    if (!selected) return false;

    const startDate = this.data.startDate; // Expecting YYYY-MM-DD from policy
    return selected < startDate || selected > this.today;
  }

  // Update your onSubmit to include the files
  onSubmit(): void {
    if (!this.isDateInvalid() && this.claimData.requestedAmount && this.claimData.description && this.claimData.incidentDate) {
      this.dialogRef.close({
        policyId: this.data.policyNumber,
        ...this.claimData,
        incidentDate: this.datePipe.transform(this.claimData.incidentDate, 'dd-MM-yyyy'),
        images: this.selectedFiles // Pass the actual File objects back
      });
    }
  }
}