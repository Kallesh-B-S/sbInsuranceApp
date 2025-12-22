import { Component, inject, computed, effect } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private keycloak = inject(Keycloak);
  private router = inject(Router);
  private keycloakEvent = inject(KEYCLOAK_EVENT_SIGNAL);

  // Reactive signal to check auth status
  authenticated = computed(() => {
    this.keycloakEvent(); // Track dependency
    return !!this.keycloak.authenticated;
  });

  constructor() {
    // Auto-redirect if already logged in
    effect(() => {
      if (this.authenticated()) {
        this.router.navigate(['/home']);
      }
    });
  }

  signIn() {
    this.keycloak.login({
      // After Keycloak login, send them back to the dashboard
      redirectUri: window.location.origin + '/home'
    });
  }
}