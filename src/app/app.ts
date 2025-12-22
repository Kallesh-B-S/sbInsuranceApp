import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';

import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { UserService } from './customer-profile';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatMenuModule, MatIconModule, MatDividerModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  private userService = inject(UserService);

  private router = inject(Router);

  user = this.userService.currentUser;

  goToHome(){
    this.router.navigate(['/home']);
  }

  private keycloak = inject(Keycloak);
  private keycloakEvent = inject(KEYCLOAK_EVENT_SIGNAL);

  authenticated = computed(() => {
    this.keycloakEvent(); // Re-evaluate when Keycloak state changes
    return !!this.keycloak.authenticated;
  });

  // 2. Reactive signal for user display data
  userData = computed(() => {
    this.keycloakEvent();
    return {
      // 'name' and 'email' are standard OIDC claims
      name: this.keycloak.tokenParsed?.['name'] || 'User',
      email: this.keycloak.tokenParsed?.['email'] || 'No email provided',
      roles: this.keycloak.tokenParsed?.['realm_access']?.['roles'] || []
    };
  });

  constructor() {
    // 2. This runs every time userData changes
    effect(() => {
      const data = this.userData();
      if (this.keycloak.authenticated) {
        console.group('🔐 Keycloak User Session');
        console.log('User Profile:', data);
        console.log('Raw Token:', this.keycloak.token);
        console.groupEnd();
      } else {
        console.log('👤 User is currently logged out');
      }
    });
  }

  async logout() {
    try {
      // This tells Keycloak to redirect the user back to your login page AFTER logging out
      await this.keycloak.logout({
        redirectUri: window.location.origin + '/login'
      });
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}