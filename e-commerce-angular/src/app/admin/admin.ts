import { Component } from '@angular/core';
import { User } from '../_services/user';

@Component({
  selector: 'app-admin',
  imports: [],
  templateUrl: './admin.html',
  styleUrl: './admin.css'
})
export class Admin {
  message: string | undefined;
  
    constructor(private userService:User) {}
  
    ngOnInit(): void {
      this.forUser();
    }
  
    forUser() {
      this.userService.forAdmin().subscribe(
        (response) => {
          console.log(response);
          this.message = response;
        }, 
        (error)=>{
          console.log(error);
        }
      );
    }
}
