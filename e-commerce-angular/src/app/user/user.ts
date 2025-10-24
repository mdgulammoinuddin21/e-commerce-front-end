import { Component, OnInit } from '@angular/core';
import { User as UserService } from '../_services/user';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.html',
  styleUrl: './user.css'
})
export class User implements OnInit {
  message: string | undefined;

  constructor(private userService:UserService) {}

  ngOnInit(): void {
    this.forUser();
  }

  forUser() {
    this.userService.forUser().subscribe(
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
