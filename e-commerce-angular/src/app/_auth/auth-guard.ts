import { CanActivateFn, Router } from "@angular/router";
import { UserAuth } from "../_services/user-auth";
import { User } from "../_services/user";
import { inject } from "@angular/core";

export const AuthGuard: CanActivateFn = (route, state) => {
  const userAuthService = inject(UserAuth);
  const userService = inject(User);
  const router = inject(Router);

  if (userAuthService.getToken() !== null) {
    const role = route.data['roles'] as Array<string>;

    if (role) {
      const match = userService.roleMatch(role);

      if (match) {
        return true;
      } else {
        router.navigate(['/forbidden']);
        return false;
      }
    }
  }

  router.navigate(['/login']);
  return false;
};