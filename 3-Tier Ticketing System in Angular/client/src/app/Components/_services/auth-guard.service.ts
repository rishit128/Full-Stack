import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{
  user:any
  constructor(private authService: AuthService, private router: Router) { }

  canActivate(){
    if(this.authService.loggedIn()) {
     this.authService.isloggedin = true
 
    
      return true;
    }
    else {
    
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
