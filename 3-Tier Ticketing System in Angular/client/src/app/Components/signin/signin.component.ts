import { Component, OnInit } from '@angular/core';
import { User } from '../_classes/user';
import { UserService } from '../_services/user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { LoginData } from '../_classes/login-data';
import { AuthService } from '../_services/auth.service';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginData = new LoginData("","");
  constructor(private authService: AuthService, private router: Router,public flashMessagesService:  FlashMessagesService) {if(this.authService.loggedIn()){
    this.router.navigateByUrl('/home')

  }
    
    {this.authService.isloggedin}}
  
  ngOnInit(): void {
    const user = localStorage.getItem('user')
   
    if(user){
   
      this.router.navigateByUrl('home')
    }
  }
  onLoginSubmit() {
    const loginData = new LoginData(this.loginData.email, this.loginData.password);
    
    this.authService.authenticateUser(loginData).subscribe(res => {
      console.log(res.message)
      if(res.result) {
        this.authService.storeUserData(res.token, res.result);
        this.authService.isloggedin = true
        this.authService.user = res.result
        this.flashMessagesService.show('You are now logged in.', { cssClass: 'alert-success', timeout: 2500});
        this.router.navigate(['home']);
      
     
        
      }
      if(res.message) {
        console.log('first')
        this.flashMessagesService.show(res.message, { cssClass: 'alert-danger', timeout: 4500});
        this.router.navigate(['login']);
      }
    
    });
  }
}
