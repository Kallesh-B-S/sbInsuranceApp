// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, MatTableModule, MatIconModule],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('Shield Insurance Dashboard');

//   // Columns to display in the table
//   displayedColumns: string[] = ['policyNumber', 'policyName', 'automobileID', 'premiumAmount', 'status'];

//   // Your unique policy data
//   policies = signal([
//     { "policyNumber": "POLTX001", "policyName": "Comprehensive Auto Plan", "automobileID": 1, "premiumAmount": 1200.00, "status": "ACTIVE" },
//     { "policyNumber": "POLFD003", "policyName": "Truck Work-Use Cover", "automobileID": 3, "premiumAmount": 1400.00, "status": "ACTIVE" },
//     { "policyNumber": "POLTS004", "policyName": "EV Battery Protection", "automobileID": 4, "premiumAmount": 2200.00, "status": "ACTIVE" },
//     { "policyNumber": "POLJP013", "policyName": "Zen Driver Coverage", "automobileID": 13, "premiumAmount": 45000.00, "status": "ACTIVE" },
//     { "policyNumber": "POLUK022", "policyName": "Luxury Estate Protection", "automobileID": 22, "premiumAmount": 1200.00, "status": "ACTIVE" },
//     { "policyNumber": "POLRU028", "policyName": "Winter Resilience", "automobileID": 28, "premiumAmount": 18000.00, "status": "ACTIVE" }
//   ]);
// }

// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTabsModule } from '@angular/material/tabs'; // New Import

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, MatTableModule, MatIconModule, MatTabsModule],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('Shield Insurance Portal');

//   // Table Columns
//   policyColumns: string[] = ['policyNumber', 'policyName', 'automobileID', 'premiumAmount', 'status'];
//   claimColumns: string[] = ['claimId', 'policyNumber', 'claimDate', 'claimAmount', 'claimStatus'];

//   // Policy Signal
//   policies = signal([
//     { "policyNumber": "POLTX001", "policyName": "Comprehensive Auto Plan", "automobileID": 1, "premiumAmount": 1200.00, "status": "ACTIVE" },
//     { "policyNumber": "POLTS004", "policyName": "EV Battery Protection", "automobileID": 4, "premiumAmount": 2200.00, "status": "ACTIVE" },
//     { "policyNumber": "POLUK022", "policyName": "Luxury Estate Protection", "automobileID": 22, "premiumAmount": 1200.00, "status": "ACTIVE" }
//   ]);

//   // Claims Signal
//   claims = signal([
//     { "claimId": "CLM-9901", "policyNumber": "POLTX001", "claimDate": "2025-11-15", "claimAmount": 4500.00, "claimStatus": "PAID" },
//     { "claimId": "CLM-8822", "policyNumber": "POLTS004", "claimDate": "2025-12-01", "claimAmount": 1200.00, "claimStatus": "PENDING" },
//     { "claimId": "CLM-7733", "policyNumber": "POLUK022", "claimDate": "2025-12-10", "claimAmount": 0.00, "claimStatus": "REJECTED" }
//   ]);
// }


// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
// import { CommonModule } from '@angular/common';
// import { MatTableModule } from '@angular/material/table';
// import { MatIconModule } from '@angular/material/icon';
// import { MatTabsModule } from '@angular/material/tabs';

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [RouterOutlet, CommonModule, MatTableModule, MatIconModule, MatTabsModule],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('SHIELD');

//   policyColumns: string[] = ['policyNumber', 'policyName', 'automobileID', 'premiumAmount', 'status'];
//   claimColumns: string[] = ['claimId', 'policyNumber', 'claimDate', 'claimAmount', 'claimStatus'];

//   policies = signal([
//     { "policyNumber": "POL-TX001", "policyName": "Comprehensive Elite", "automobileID": 1, "premiumAmount": 1200.00, "status": "ACTIVE" },
//     { "policyNumber": "POL-TS004", "policyName": "EV Battery Pro", "automobileID": 4, "premiumAmount": 2200.00, "status": "ACTIVE" },
//     { "policyNumber": "POL-UK022", "policyName": "Luxury Estate Plus", "automobileID": 22, "premiumAmount": 1200.00, "status": "ACTIVE" }
//   ]);

//   claims = signal([
//     { "claimId": "CLM-9901", "policyNumber": "POL-TX001", "claimDate": "2025-11-15", "claimAmount": 4500.00, "claimStatus": "PAID" },
//     { "claimId": "CLM-8822", "policyNumber": "POL-TS004", "claimDate": "2025-12-01", "claimAmount": 1200.00, "claimStatus": "PENDING" }
//   ]);
// }