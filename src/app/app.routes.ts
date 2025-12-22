import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { loadUserGuard } from './load-user-guard';

export const routes: Routes = [
    // 1. Protected Shell: Any route inside 'children' requires BOTH guards
    {
        path: '',
        canActivate: [authGuard, loadUserGuard], // authGuard finishes first, then loadUserGuard runs
        children: [
            { 
                path: 'home', 
                loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard) 
            },
            { 
                path: 'claims/:id', 
                loadComponent: () => import('./claims/claims').then(m => m.Claims) 
            },
            { 
                path: 'policy/:id', 
                loadComponent: () => import('./policy-detail/policy-detail').then(m => m.PolicyDetail) 
            },
            { 
                path: 'claim/:id', 
                loadComponent: () => import('./claim-detail/claim-detail').then(m => m.ClaimDetail) 
            },
            // The empty path inside the protected shell goes to /home
            { path: '', redirectTo: 'home', pathMatch: 'full' }
        ]
    },

    // 2. Public Routes
    { 
        path: 'login', 
        loadComponent: () => import('./login/login').then(m => m.Login) 
    },

    // 3. Global Wildcard
    { path: '**', redirectTo: 'login' }
];