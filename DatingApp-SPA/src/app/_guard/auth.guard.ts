import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authServ: AuthService,
              private router: Router,
              private alertifyServ: AlertifyService){}

  canActivate(): boolean{
    if (this.authServ.loggedIn()){
      return true;
    }

    this.alertifyServ.error("You shall not pass!");
    this.router.navigate(['/home']);
    return false
  }

}
