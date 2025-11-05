import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../_services/user';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-register',
  imports: [FormsModule,MatFormFieldModule,MatInputModule,MatButtonModule,RouterModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  constructor(
    private userService:User,
    private router:Router
  ) {}

  register(registerForm: NgForm) {
    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login'])
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
