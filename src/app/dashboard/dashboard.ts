import { Component, signal, computed } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ CommonModule, MatTableModule, MatIconModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  protected readonly title = signal('SHIELD');

  // Track which view is active: 'policies' or 'claims'
  currentView = signal<'policies' | 'claims' | 'activePolicies'>('policies');

  // policyColumns: string[] = ['policyNumber', 'policyName', 'premiumAmount', 'status'];
  // Updated columns in dashboard.ts
  policyColumns: string[] = ['policyNumber', 'policyName', 'automobileID', 'premiumAmount', 'status'];
  // Added column for the claims table view
  claimTableColumns: string[] = ['claimId', 'policyNumber', 'claimAmount', 'claimStatus'];

  // policies = signal([
  //   { "policyNumber": "POL-TX001", "policyName": "Comprehensive Elite", "automobileID": 1, "premiumAmount": 1200.00, "status": "ACTIVE" },
  //   { "policyNumber": "POL-TS004", "policyName": "EV Battery Pro", "automobileID": 4, "premiumAmount": 2200.00, "status": "ACTIVE" },
  //   { "policyNumber": "POL-UK022", "policyName": "Luxury Estate Plus", "automobileID": 22, "premiumAmount": 1200.00, "status": "ACTIVE" },
  //   { "policyNumber": "POL-CN025", "policyName": "Smart Plan", "automobileID": 25, "premiumAmount": 5500.00, "status": "ACTIVE" }
  // ]);

  policies = signal([
    {
      "policyNumber": "POLTX001",
      "policyName": "Comprehensive Auto Plan",
      "automobileID": 1,
      "premiumAmount": 1200.00,
      "status": "ACTIVE"
    },
    {
      "policyNumber": "POLHN003",
      "policyName": "Basic Liability Plan",
      "automobileID": 2,
      "premiumAmount": 800.00,
      "status": "ACTIVE"
    }
  ]);

  claims = signal([
    { "claimId": "CLM-9901", "policyNumber": "POL-TX001", "claimAmount": 4500.00, "claimStatus": "PAID" },
    { "claimId": "CLM-8822", "policyNumber": "POL-TS004", "claimAmount": 1200.00, "claimStatus": "PENDING" },
    { "claimId": "CLM-1022", "policyNumber": "POL-UK022", "claimAmount": 850.00, "claimStatus": "PAID" }
  ]);

  // Method to change the view
  setView(view: 'policies' | 'claims' | 'activePolicies') {
    this.currentView.set(view);
  }
}