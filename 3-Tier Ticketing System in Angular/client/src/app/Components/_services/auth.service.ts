import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_classes/user'
import { LoginData } from '../_classes/login-data';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  loginData: LoginData;
  user: User;
  isloggedin:boolean=false;

  constructor(private http: HttpClient,private router: Router) {}

  authenticateUser(loginData: LoginData): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type':  'application/json'
    });
    return this.http.post("http://localhost:5000/user/signin", loginData, {headers: headers});
  }

  storeUserData(token:any, result:any) {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(result));
    this.authToken = token;

    this.user = result;

  }

  logout() {
    this.authToken = null;

   
    localStorage.clear();
  }

  loadToken() {
    this.authToken = localStorage.getItem("id_token");
    this.user = JSON.parse(localStorage.getItem('user')|| '{}')
  }

  loggedIn() {
    const helper = new JwtHelperService();
    this.loadToken()
    const isNotExpired = !helper.isTokenExpired(this.authToken);
 
    return isNotExpired;
  }
  
}