import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { UserService } from './../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class GuestGuard implements CanActivate {

  constructor(private router: Router,
              private user_service : UserService){}

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot
             ): boolean{
      if(this.user_service.isUserLoggedIn()){
        this.router.navigate(['logged']);
        return false;
      } else {
        return true;
      }
  }

}
