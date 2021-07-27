import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from './../../shared/models';
import { UserService, NotificationService } from './../../shared/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  form_group: FormGroup;

  constructor(private user_service : UserService,
              private notification_service: NotificationService,
              private router : Router,
              private form_builder: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm(): void {
    this.form_group = this.form_builder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  resetForm(): void {
    this.form_group.reset();
  }

  onSubmit() : void{
    this.notification_service.presentIonLoading();
    let auth = this.form_group.getRawValue() as Auth;
    this.user_service.login(auth).subscribe(
      (response) => {
        this.resetForm();
        this.user_service.setAuthCredentials(response.access_token,response.refresh_token);
        this.router.navigate(['logged']);
      },
      () => {
        this.notification_service.hideIonLoading();
      },
      () => {
        this.notification_service.hideIonLoading();
      }
    );
  }

}
