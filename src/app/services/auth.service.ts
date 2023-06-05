import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { EventEmitter } from '@angular/core';

import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {
  token: string = localStorage.getItem('accessToken') ?? '';

  constructor(private http: HttpClient, private router: Router) {}

  loginSuccess: EventEmitter<any> = new EventEmitter();

  canActivate():boolean {
    if(!this.isLoggedIn()) {
      // this.router.navigate(['login']);
      // localStorage.removeItem('token');
      console.log('asdasdasd');
      
      return false
    }
    return true;
  }

  setToken(token: string) {
    this.token = token;
  }

  getToken(): string {
    return this.token;
  }

  signup (dataForm: object) {
    return this.http.post(env.BASE_URL + 'register', dataForm);
  }

  login (dataForm: object) {
    return this.http.post(env.BASE_URL + '/auth/login', dataForm);
  }

  isLoggedIn():boolean {
    const jwtHelper = new JwtHelperService();

    if(!this.token) return false;

    return !jwtHelper.isTokenExpired(this.token);
  }

  autoLogin() {
    const getStorage = localStorage.getItem('accessToken');

    const token = getStorage !== null ? JSON.parse(getStorage) : null;   

    this.setToken(token)

    if(!this.token) return;
  }

  getAllArea() {
    return this.http.get(env.BASE_URL + 'getall-area' , {
      headers: new HttpHeaders().set('x-access-token', this.getToken())
    });
  }

}
