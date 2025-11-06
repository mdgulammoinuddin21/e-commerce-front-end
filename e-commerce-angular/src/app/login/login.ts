import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../_services/user';
import { UserAuth } from '../_services/user-auth';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule,MatIconModule], 
  templateUrl: './login.html',
  styleUrls: ['./login.css'] 
})
export class Login {
  hidePassword: boolean = true;
  constructor(
    private userService: User,
    private userAuthService: UserAuth,
    private router: Router
  ) { }

  login(loginForm: NgForm) {
    this.userService.login(loginForm.value).subscribe(
      (response: any) => {
        this.userAuthService.setRoles(response.user.role);
        this.userAuthService.setToken(response.jwtToken);

        const role = response.user.role[0].roleName;
        if (role === 'Admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/user']);
        }
        
      },
      (error) => {
        console.log(error);
      }
    );
  }
  registerUser() {
    this.router.navigate(['/register']);
  }
}
