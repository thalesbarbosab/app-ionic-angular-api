import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

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

  constructor(private user_service : UserService) {}

  toggle_theme : boolean;

  ngOnInit() {
    if(this.user_service.verifyDarkTheme()){
      this.toggle_theme = true;
    }
  }

  changeTheme(event) {
    this.user_service.changeTheme(event);
  }

}
