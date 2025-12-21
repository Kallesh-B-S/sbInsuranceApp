import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) },
    { path: 'policy/:id', loadComponent: () => import('./policy-detail/policy-detail').then(m => m.PolicyDetail) },
    { path: 'claim/:id', loadComponent: () => import('./claim-detail/claim-detail').then(m => m.ClaimDetail) }
];