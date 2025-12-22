import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';

export const routes: Routes = [
    // 1. Specific Protected Routes
    {
        path: 'home', loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard),
        canActivate: [authGuard]
    },
    {
        path: 'claims', loadComponent: () => import('./claims/claims').then(m => m.Claims),
        canActivate: [authGuard]
    },
    {
        path: 'policy/:id', loadComponent: () => import('./policy-detail/policy-detail').then(m => m.PolicyDetail),
        canActivate: [authGuard]
    },
    {
        path: 'claim/:id', loadComponent: () => import('./claim-detail/claim-detail').then(m => m.ClaimDetail)
        , canActivate: [authGuard]
    },

    // 2. Public Login Route
    { path: 'login', loadComponent: () => import('./login/login').then(m => m.Login) },

    // 3. The Empty Path should go to LOGIN if you want that as the landing page
    // OR it should go to HOME if you want the Guard to handle the force-redirect
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    // 4. Wildcard - must be last
    { path: '**', redirectTo: 'login' }
];