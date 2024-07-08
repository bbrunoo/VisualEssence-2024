import { CanActivateFn } from '@angular/router';

export const paisGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
