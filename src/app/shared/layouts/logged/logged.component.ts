import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService, NotificationService } from './../../services';

@Component({
  selector: 'app-logged',
  templateUrl: './logged.component.html',
  styleUrls: ['./logged.component.scss'],
})
export class LoggedComponent implements OnInit {

  public app_pages = [
    { title: 'Início', url: '/logged/home', icon: 'home' },
    { title: 'Usuários', url: '/logged/users', icon: 'people' }
  ];

  constructor(private user_service : UserService,
              private notification_service : NotificationService,
              private router : Router) {}

  toggle_theme : boolean;

  ngOnInit() {
    if(this.user_service.verifyDarkTheme()){
      this.toggle_theme = true;
    }
  }

  changeTheme(event) {
    this.user_service.changeTheme(event);
  }

  logout(){
    this.notification_service.presentIonLoading();
    this.user_service.logout().subscribe(
      () => {
        this.user_service.removeTokens();
        this.notification_service.presentIonToast('usuário desconectado com sucesso!',7000,'success');
      },
      () => {
        this.notification_service.hideIonLoading();
      },
      () => {
        this.router.navigate(['']);
        this.notification_service.hideIonLoading();
      }
    );
  }

}
