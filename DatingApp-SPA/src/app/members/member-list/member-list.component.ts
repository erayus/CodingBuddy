import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_model/User';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})

export class MemberListComponent implements OnInit {
  users: User[];
  constructor(private userServ: UserService,
              private alertifyServ: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(
      data => this.users = data['users'].result
    );
  }

  // loadUsers() {
  //   this.userServ.getUsers().subscribe(
  //     (users: User[]) => {
  //       this.users = users;
  //     }, error => {
  //       this.alertifyServ.error(error);
  //     });
  // }

}
