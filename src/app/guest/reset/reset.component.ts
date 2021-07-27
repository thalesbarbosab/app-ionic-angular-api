import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Auth } from 'src/app/shared/models';
import { UserService, NotificationService } from './../../shared/services';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss'],
})
export class ResetComponent implements OnInit {

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
      email: ['', [Validators.required, Validators.email]],
    });
  }

  resetForm(): void {
    this.form_group.reset();
  }

  onSubmit() : void{
    this.notification_service.presentIonLoading();
    let form = this.form_group.getRawValue();
    this.user_service.reset(form.email).subscribe(
      (response) => {
        this.resetForm();
        this.router.navigate(['login']);
        this.notification_service.presentIonToast(response.message,7000,'success');
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
