import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    //
  }
}
