import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  const loggedIn = sessionStorage.getItem('loggedIn');
  const city = route.params['city'];

  if (loggedIn) {
    return true;
  }

  if (city) {
    return router.createUrlTree(['/', city, 'login']);
  } else {
    return router.createUrlTree(['/login']);
  }
};
