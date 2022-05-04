import { Component, OnInit } from '@angular/core';

import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  model = new User("",0, "", "","");

  constructor(private userService: UserService,
    private router: Router,
    public flashMessagesService:  FlashMessagesService
    ) { }
    onRegisterSubmit() {
      this.userService
      .registerUser(this.model)
      .subscribe(res => {
        if(res.result) {

          this.flashMessagesService.show("User registered successfully", { cssClass: 'alert-success', timeout: 5500});
  
        }
        if(res.message) {
     
          this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 4500});
          this.router.navigate(['/signup']);
        }
      });
    }
  ngOnInit(): void {
  }

}
