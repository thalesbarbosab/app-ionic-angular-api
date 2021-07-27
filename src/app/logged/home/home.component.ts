import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models';
import { NotificationService, UserService } from 'src/app/shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  user : User;

  constructor(private notification_service : NotificationService,
              private user_service : UserService) { }

  ngOnInit() {
    this.user = null;
    this.me();
  }

  me() : void {
    this.notification_service.presentIonLoading('buscando seu dados...');
    this.user_service.me().subscribe(
      (user: User) => {
        this.user = user;
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
