import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuth } from '../_services/user-auth';
import { catchError, throwError } from 'rxjs';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const userAuthService = inject(UserAuth);
  const router = inject(Router);

  if (req.headers.get('No-Auth') === 'True') {
    return next(req);
  }

  const token = userAuthService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError(err => {
      console.log('Error status:', err.status);
      if (err.status === 401) {
        router.navigate(['/login']);
      } else if (err.status === 403) {
        router.navigate(['/forbidden']);
      }
      return throwError(() => new Error('Something went wrong'));
    })
  );
};
