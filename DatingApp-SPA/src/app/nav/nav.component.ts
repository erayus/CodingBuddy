import { Component, OnInit } from '@angular/core';
import { AuthService } from './../_services/auth.service';
import { AlertifyService } from './../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(public authServ: AuthService,
              private alertify: AlertifyService,
              private router: Router) { }

  ngOnInit() {
  }

  login(){
    this.authServ.login(this.model).subscribe(next => {
      this.alertify.success('Logged In Successfully');
    }, error => {
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members'])
    });
  }

  loggedIn() {
    return this.authServ.loggedIn();
  }

  logout(){
    this.authServ.logout();
  }
}
