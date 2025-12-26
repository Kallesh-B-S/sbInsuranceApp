import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

export interface CustomerProfile {
  id: number;
  email: string;
  fullName: string;
  dob: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  phone: string;
}

@Injectable({ providedIn: 'root' })
export class UserService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private keycloak = inject(Keycloak);
  private keycloakEvent = inject(KEYCLOAK_EVENT_SIGNAL);

  currentUser = signal<CustomerProfile | null>(null);

  allowedPaths = signal<string[] | null>(null);

  userRole = signal<string | null>(null);

  fetchAndStoreUser(email: string) {
    return this.http.get<CustomerProfile>(`${environment.customerApiUrl}/customer/email/${email}`).pipe(
      tap(user => {
        console.log('User data successfully fetched:', user);
        this.currentUser.set(user);

        if(this.keycloak.hasRealmRole('adjuster')){
          this.allowedPaths.set(['validate-claims','claim']);
          this.userRole.set('adjuster');
        }
        else{
          this.allowedPaths.set(['home','policy','claims','claim'])
          this.userRole.set('customer');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // 1. Alert the user
        // alert(`Session Error: ${error.statusText || 'Could not fetch profile'}`);

        // 2. Perform Logout (Calling the async method without await here is fine 
        // because Keycloak will trigger a page redirect anyway)
        alert("Invalid Username/Password")
        this.logout();

        // 3. Return the error
        return throwError(() => error);
      })
    );
  }

  async logout() {

    try {
      this.clearUser(); // Clear local state first
      await this.keycloak.logout({
        redirectUri: window.location.origin + '/login'
      });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }

  clearUser() {
    this.currentUser.set(null);
  }
}