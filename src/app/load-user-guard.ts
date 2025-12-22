import { computed, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { UserService } from './customer-profile';

import { KEYCLOAK_EVENT_SIGNAL } from 'keycloak-angular';
import Keycloak from 'keycloak-js';
import { lastValueFrom } from 'rxjs';

export const loadUserGuard: CanActivateFn = async () => {
  const keycloak = inject(Keycloak);
  const userService = inject(UserService);

  // Directly check the property
  if (keycloak.authenticated) {
    try {
      // 1. Ensure profile is loaded (populates tokenParsed)
      await keycloak.loadUserProfile();

      const email = keycloak.tokenParsed?.['email'];
      const userStored = userService.currentUser();

      // 2. Only call API if we have an email and no user in our Signal yet
      if (email && !userStored) {
        console.log('Guard: Fetching user details for', email);
        await lastValueFrom(userService.fetchAndStoreUser(email));
      }
    } catch (error) {
      console.error('Guard: Error loading user data', error);
    }
  }

  return true; // Let them in regardless, or return false to block
};