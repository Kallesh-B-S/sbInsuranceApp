import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';
import {
  provideKeycloak,
  includeBearerTokenInterceptor,
  withAutoRefreshToken,
  AutoRefreshTokenService, // <--- Add this
  UserActivityService,      // <--- Add this
  INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG
} from 'keycloak-angular';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes, withHashLocation()),
    provideHttpClient(
      withInterceptors([
        includeBearerTokenInterceptor
      ])
    ),
    {
      provide: INCLUDE_BEARER_TOKEN_INTERCEPTOR_CONFIG,
      useValue: [
        {
          urlPattern: new RegExp(`^(${environment.customerApiUrl})(\/.*)?$`, 'i'),
          httpMethods: ['GET', 'POST', 'PUT', 'DELETE']
        },
        {
          urlPattern: new RegExp(`^(${environment.policyApiUrl})(\/.*)?$`, 'i'),
          httpMethods: ['GET', 'POST', 'PUT', 'DELETE']
        },
        {
          urlPattern: new RegExp(`^(${environment.claimApiUrl})(\/.*)?$`, 'i'),
          httpMethods: ['GET', 'POST', 'PUT', 'DELETE']
        }
      ]
    },
    provideKeycloak({
      config: {
        url: environment.keycloakUrl,
        realm: environment.keycloakRealm,
        clientId: environment.keycloakClientId
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html'
      },
      features: [
        withAutoRefreshToken()
      ],
      // V20 requirement: You must provide the services that support the features
      providers: [AutoRefreshTokenService, UserActivityService] // <--- Add this line here
    })
  ]
};