import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from './../../shared/models';
import { UserService, NotificationService } from './../../shared/services';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

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
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      password_confirmation: ['']
    });
  }

  resetForm(): void {
    this.form_group.reset();
  }

  onSubmit() : void{
    this.notification_service.presentIonLoading('registrando novo usuário...');
    let user = this.form_group.getRawValue() as User;
    user.password_confirmation = user.password;
    this.user_service.register(user).subscribe(
      () => {
        this.resetForm();
        this.router.navigate(['login']);
      },
      (error) => {
        this.notification_service.hideIonLoading();
      },
      () => {
        this.notification_service.hideIonLoading();
      }
    );
  }

}
