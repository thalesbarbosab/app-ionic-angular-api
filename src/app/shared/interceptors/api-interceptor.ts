import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpResponse
} from '@angular/common/http'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { UserService,NotificationService } from '../services';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private user_service: UserService,
    private notification_service: NotificationService,
    private router : Router
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    const token = this.user_service.getAuthorizationToken();
    let request: HttpRequest<any> = req;

    if (token && !this.user_service.isTokenExpired(token)) {
      request = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return next.handle(request)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            let message = event.body.message;
            if(message!==undefined){
              this.notification_service.presentIonToast(`${message}`,5000,'success');
            }
          }
        }, error => {
          if (error.status == 400) {
            this.notification_service.presentIonToast('as credenciais informadas não foram encontradas',5000,'danger');
          }else if (error.status >= 401 && error.status <= 403) {
            this.notification_service.presentIonToast('você não possúi permissão para realizar esta ação, realize o login e tente novamente.',5000,'warning');
            this.router.navigate(['login']);
          } else if (error.status == 422) {
            Object.entries(error.error.errors).forEach((item) => {
              item.forEach((item2, index) => {
                if (index == 1)
                this.notification_service.presentIonToast(`${item2}`,6000,'danger');
              })
            })
          } else if (error.status == 500) {
            this.notification_service.presentIonToast('ocorreu um erro e não conseguimos processar a última ação',5000,'danger');
          }
        })
      );
  }
}
