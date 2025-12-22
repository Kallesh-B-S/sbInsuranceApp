import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { createAuthGuard } from 'keycloak-angular';
import Keycloak from 'keycloak-js';

export const authGuard = createAuthGuard(async (route, state, authData) => {
  const keycloak = inject(Keycloak);
  const router = inject(Router);

  // 1. Check if the user is authenticated
  if (authData.authenticated) {
    return true; // Access granted
  }

  // 2. If not authenticated, trigger the Keycloak login redirect
  await keycloak.login({
    redirectUri: window.location.origin + state.url
  });

  return false; 
});