import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserAuth } from '../_services/user-auth';
import { User } from '../_services/user';
import { CommonModule, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [RouterLink,NgIf,CommonModule,MatToolbarModule,MatButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  constructor(
    private userAuthService: UserAuth,
    private router: Router,
    public userService: User
  ) {}

  public isLoggedIn() {
    return this.userAuthService.isLoggedIn();
  }

  public logout() {
    this.userAuthService.clear();
    this.router.navigate(['/']);
  }

  public isAdmin() {
    return this.userAuthService.isAdmin();
  }

  public isUser() {
    return this.userAuthService.isUser();
  }
}
