import { Auth } from './../models/auth';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { User } from './../models';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  protected http_headers = new HttpHeaders();

  constructor(private http :  HttpClient) {
    this.http_headers.set('Accept','application/json');
  }

  verifyDarkTheme() : boolean{
    if(localStorage.getItem('color-theme-dark')){
      document.body.setAttribute('color-theme','dark');
      return true;
    }
    else{
      return false;
      document.body.setAttribute('color-theme','light');
    }
  }

  changeTheme(event) {
    if(event.detail.checked){
      document.body.setAttribute('color-theme','dark');
      localStorage.setItem('color-theme-dark','true');
    }
    else{
     document.body.setAttribute('color-theme','light');
     localStorage.removeItem('color-theme-dark');
    }
  }

  getAuthorizationToken(){
    const token = window.localStorage.getItem('access_token');
    return token;
  }
  getTokenExpirationDate(token: string): Date {
    const decoded: any =  jwt_decode.default(token);
    if (decoded.exp === undefined) {
      return null;
    }
    const date = new Date(0);
    date.setUTCSeconds(decoded.exp);
    return date;
  }
  isTokenExpired(token?: string): boolean {
    if (!token) {
      return true;
    }
    const date = this.getTokenExpirationDate(token);
    if (date === undefined) {
      return false;
    }
    return !(date.valueOf() > new Date().valueOf());
  }
  isUserLoggedIn() {
    const token = this.getAuthorizationToken();
    if (!token) {
      return false;
    } else if (this.isTokenExpired(token)) {
      return false;
    }
    return true;
  }
  removeTokens(){
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }
  login(auth : Auth) : Observable<Auth>{
    auth.grant_type = environment.grant_type;
    auth.client_id = environment.client_id;
    auth.client_secret = environment.client_secret;
    return this.http.post<Auth>(`${environment.api}oauth/token`,auth,{headers: this.http_headers});
  }

  setAuthCredentials(access_token : string, refresh_token : string) : void {
    localStorage.setItem('access_token',access_token);
    localStorage.setItem('refresh_token',refresh_token);
  }

  register(user : User) : Observable<User> {
    return this.http.post<User>(`${environment.api}api/user`,user,{headers: this.http_headers});
  }
  async reset(email: string) {
    const params = {
      'email' : email
    }
    const result = await this.http.post<any>(`${environment.api}api/user/reset`,params,{headers: this.http_headers}).toPromise();
    return result;
  }
  async logout() {
    const result = await this.http.post<any>(`${environment.api}api/user/logout`,{headers: this.http_headers}).toPromise();
    return result;
  }

  me() : Observable<User> {
    return this.http.get<User>(`${environment.api}api/user/me`,{headers: this.http_headers});
  }

  update(user : User) : Observable<User> {
    return this.http.put<User>(`${environment.api}api/user`,user,{headers: this.http_headers});
  }
  changePassword(password : string) : Observable<any> {
    const params = {
      password: password,
      password_confirmation: password
    }
    return this.http.put<any>(`${environment.api}api/user/change-password`,params,{headers: this.http_headers});
  }
}
