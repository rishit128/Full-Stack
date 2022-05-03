import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public AuthService:AuthService,public router: Router) { this.AuthService.user
    if (this.AuthService.loggedIn()) {
      this.router.navigate(['home']);
  }
  }

  ngOnInit(): void {
    
    
  }
  onLogoutClick() {
    
    this.AuthService.logout();
    this.AuthService.isloggedin = false;
    this.router.navigate(['/signin']);
   
  }

}
