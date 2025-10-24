import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { UserAuth } from '../_services/user-auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private userAuthService: UserAuth, private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') === 'True') {
      return next.handle(req.clone());
    }

    const token = this.userAuthService.getToken();

    req = this.addToken(req, token);

    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        console.log('Error status:', err.status);

        if (err.status === 401) {
          this.router.navigate(['/login']);
        } else if (err.status === 403) {
          this.router.navigate(['/forbidden']);
        }

        return throwError(() => new Error('Something went wrong'));
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string | null) {
    if (token) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
    return request;
  }
}
