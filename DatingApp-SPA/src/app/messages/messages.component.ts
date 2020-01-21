import { Component, OnInit } from '@angular/core';
import { Message } from '../_model/message';
import { Pagination, PaginatedResult } from '../_model/pagination';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Outbox';
  constructor(private userServ: UserService,
              private authService: AuthService,
              private alertify: AlertifyService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      console.log(this.messages);
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userServ.getMessages(this.authService.decodedToken.nameid, this.pagination.currentPage, this.pagination.itemsPerPage, this.messageContainer).subscribe(
      (res: PaginatedResult<Message[]> ) => {
        this.messages = res.result;
        console.log(this.messages);

        this.pagination = res.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  pageChanged(event: any) : void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

}
