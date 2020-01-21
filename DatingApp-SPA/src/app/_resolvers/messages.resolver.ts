import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Message } from '../_model/message';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MessagesResolver implements Resolve<Message[]>{
  pageNumber = 1;
  pageSize = 4;
  messsageContainer = 'Unread';

  constructor(private userServ: UserService,
              private authServ: AuthService,
              private router: Router,
              private alertify: AlertifyService){}

  resolve(): Observable<Message[]> {
    return this.userServ.getMessages(this.authServ.decodedToken.nameid, this.pageNumber, this.pageSize, this.messsageContainer)
    .pipe(
      catchError(error => {
        this.alertify.error('Problem retrieving data');
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }

}
