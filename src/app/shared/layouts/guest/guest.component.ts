import { Component, OnInit } from '@angular/core';
import { UserService } from './../../services/user.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {

  public app_pages = [
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Recuperar senha', url: '/reset', icon: 'refresh-circle' },
    { title: 'Registrar novo usuário', url: '/register', icon: 'person-add' }
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
