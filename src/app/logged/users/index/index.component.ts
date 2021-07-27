import { Component, OnInit } from '@angular/core';
import { User } from './../../../shared/models/user';
import { UserService, NotificationService } from 'src/app/shared/services';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class UserIndexComponent implements OnInit {

  users : User[];

  constructor(private notification_service : NotificationService,
              private user_service : UserService) { }

  ngOnInit() {
    this.users = null;
    this.index();
  }

  index() : void{
    this.notification_service.presentIonLoading('buscando usuários...');
    this.user_service.list().subscribe(
      (users: User[]) => {
        this.users = users;
      },
      (error) => {
        this.notification_service.hideIonLoading();
      },
      () => {
        this.notification_service.hideIonLoading();
      }
    );
  }

  refresh(event) : void {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
