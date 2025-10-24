import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserAuth {

  constructor() {}

  public setRoles(roles: string[]): void {
    localStorage.setItem('roles', JSON.stringify(roles));
  }

  public getRoles(): string[] {
    const roles = localStorage.getItem('roles');
    return roles ? JSON.parse(roles) : [];
  }

  public setToken(jwtToken: string): void {
    localStorage.setItem('jwtToken', jwtToken);
  }

  public getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  public clear(): void {
    localStorage.clear();
  }

  public isLoggedIn() {
    return this.getRoles() && this.getToken();
  }

  public isAdmin() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'Admin';
  }

  public isUser() {
    const roles: any[] = this.getRoles();
    return roles[0].roleName === 'User';
  }

}
