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
    //
  }

}
