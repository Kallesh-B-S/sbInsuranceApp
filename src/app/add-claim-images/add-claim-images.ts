import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-claim-images',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './add-claim-images.html',
  styleUrls: ['./add-claim-images.css'] // Reusing your existing styles
})
export class AddClaimImages {
  selectedFiles: File[] = [];
  previewUrls: string[] = [];

  constructor(
    public dialogRef: MatDialogRef<AddClaimImages>,
    @Inject(MAT_DIALOG_DATA) public data: { claimId: number }
  ) {}

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const isDuplicate = this.selectedFiles.some(
        exists => exists.name === file.name && exists.size === file.size
      );

      if (!isDuplicate) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previewUrls.push(e.target.result);
          this.selectedFiles.push(file);
        };
        reader.readAsDataURL(file);
      }
    });
    event.target.value = '';
  }

  removeImage(index: number, event: MouseEvent): void {
    event.stopPropagation();
    this.selectedFiles.splice(index, 1);
    this.previewUrls.splice(index, 1);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpload(): void {
    // Returns the array of File objects to the parent component
    this.dialogRef.close(this.selectedFiles);
  }
}