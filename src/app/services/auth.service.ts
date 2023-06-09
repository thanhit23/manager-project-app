import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { EventEmitter } from '@angular/core';

import { ROLE } from '../../constants/role';
import env from '../../constants/env.developer';
import { configToast } from '../../constants/toastMessage';

@Injectable({
  providedIn: 'root'
})

export class AuthService implements CanActivate {
  token: string = localStorage.getItem('accessToken') ?? '';

  constructor(private http: HttpClient, private router: Router, private toast: ToastrService) {}

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

  setTokenHeaders() {
    return new HttpHeaders({ 'Authorization': `Bearer ${this.token}` })
  }

  setToken(token?: string) {
    if (token) {
      this.token = token;
    } else {
      this.token = '';
    }
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

  me () {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.getToken()}`
    })

    return this.http.get(env.BASE_URL + '/auth/me', { headers });
  }

  getMe () {
    this.me().subscribe((res: any) => {
      const { status, data: { role } } = res;

      if (status) {
        if(role === ROLE.leader.id) {
          this.router.navigate(['/']);
        } else {
          this.router.navigate(['employee/manage-task']);
        }
      }
    }, ({ error: { message }}) => {
      this.toast.error(`${message}`, 'Error!', configToast);

      this.setToken('');

      this.router.navigate(['/login']);
    })
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
