import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserAuth } from './user-auth';

@Injectable({
  providedIn: 'root'
})
export class User {
  
  PATH_OF_API = 'http://localhost:9090';

  // Header for public (no-token) requests
  requestHeader = new HttpHeaders({ 'No-Auth': 'True' });

  constructor(
    private httpclient: HttpClient,
    private userAuthService: UserAuth
  ) { }

  // Login request (no token needed)
  public login(loginData: any) {
    return this.httpclient.post(
      `${this.PATH_OF_API}/authenticate`,
      loginData,
      { headers: this.requestHeader }
    );
  }

  // Authenticated request for USER
  public forUser(): Observable<string> {
    return this.httpclient.get(`${this.PATH_OF_API}/forUser`, {
      responseType: 'text'
    });
  }

  // Authenticated request for ADMIN
  public forAdmin(): Observable<string> {
    return this.httpclient.get(`${this.PATH_OF_API}/forAdmin`, {
      responseType: 'text'
    });
  }

  // Role matching logic
  public roleMatch(allowedRoles: any): boolean {
    let isMatch = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          }
        }
      }
    }

    return isMatch;
  }
}
