import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {map} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';
import { environment } from './../../environments/environment';
import { User } from '../_model/User';
import { Router } from '@angular/router';
import { AlertifyService } from './alertify.service';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  currentUser: User;


  constructor(private http: HttpClient,
              private router: Router,
              private alertify: AlertifyService,
              private userServ: UserService,

              ) { }




  login(model: any){
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          if (response) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user))
            this.decodedToken = this.jwtHelper.decodeToken(response.token);
            this.currentUser = response.user;
          }
        })
      );
  }
  register(user:User){
    return this.http.post(this.baseUrl + 'register', user);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.decodedToken = null;
    this.currentUser = null;
    this.alertify.message('Logged out');
    this.router.navigate(['/']);
  }

}
