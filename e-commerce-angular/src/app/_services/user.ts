import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuth } from './user-auth';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

  PATH_OF_API = 'http://localhost:9090';

  requestHeader = new HttpHeaders(
    { 'No-Auth': 'True' }
  );

  constructor(
    private httpclient : HttpClient,
    private userAuthService: UserAuth
  ) { }

  public login(loginData : any) {
    return this.httpclient.post(this.PATH_OF_API + '/authenticate', loginData, { headers: this.requestHeader});
  }

  public forUser(): Observable<string> {
    const token = this.userAuthService.getToken(); // get token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.get(this.PATH_OF_API + '/forUser', {
      headers,
      responseType: 'text'
    });
  }



  public forAdmin(): Observable<string> {
    const token = this.userAuthService.getToken(); // get token from local storage
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.httpclient.get(this.PATH_OF_API + '/forAdmin', {
      headers,
      responseType: 'text'
    });
  }


  public roleMatch(allowedRoles:any): boolean {
    let isMatch:boolean = false;
    const userRoles: any = this.userAuthService.getRoles();

    if (userRoles != null && userRoles) {
      for (let i = 0; i < userRoles.length; i++) {
        for (let j = 0; j < allowedRoles.length; j++) {
          if (userRoles[i].roleName === allowedRoles[j]) {
            isMatch = true;
            return isMatch;
          } else {
            return isMatch;
          }
        }
      }
    }
    return isMatch;
  }
}
