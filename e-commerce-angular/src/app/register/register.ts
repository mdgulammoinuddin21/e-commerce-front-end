import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { User } from '../_services/user';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterModule, MatIconModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  @ViewChild('registerForm') registerForm!: NgForm;
  
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  
  constructor(
    private userService: User,
    private router: Router
  ) {}

  // Method to check if passwords match
  passwordsMatch(): boolean {
    const password = this.registerForm?.controls?.['userPassword']?.value;
    const confirmPassword = this.registerForm?.controls?.['confirmPassword']?.value;
    return password === confirmPassword;
  }

  // Method to check if form is valid including password match
  isFormValid(): boolean | null {
    return this.registerForm?.valid && this.passwordsMatch();
  }

  register(registerForm: NgForm) {
    // Double check passwords match before submitting
    if (!this.passwordsMatch()) {
      alert('Passwords do not match!');
      return;
    }

    console.log(registerForm.value);
    this.userService.register(registerForm.value).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/login']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}