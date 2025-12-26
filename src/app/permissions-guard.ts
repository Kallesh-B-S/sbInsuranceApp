import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './customer-profile';

export const permissionsGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  // 1. Get the list of allowed routes from the service
  const allowedRoutes: any = userService.allowedPaths(); // e.g., ['home', 'claims']

  // 2. Get the path the user is trying to visit
  // We look at the first segment of the URL
  // const targetPath = route.routeConfig?.path;
  const firstSegment = route.url[0]?.path;

  // 3. Check if the path is in the allowed list
  if (firstSegment && allowedRoutes.includes(firstSegment)) {
    return true;
  }

  // 4. If invalid, redirect to the 0th index of allowed routes
  const fallbackRoute = allowedRoutes.length > 0 ? `/${allowedRoutes[0]}` : '/login';

  return router.createUrlTree([fallbackRoute]);
};