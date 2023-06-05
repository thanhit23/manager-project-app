import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  url = 'https://be-angular.onrender.com/api/';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllEmployee() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    })

    return this.http.get(env.BASE_URL + '/v1/employee' , { headers });
  }

  updateProfile(id: string, data: object) {
    return this.http.put(this.url + 'update-profile/' + id, data , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  deleteEmployee(id: string) {
    return this.http.delete(this.url + 'delete-employee/' + id , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  getOneEmployee(id: any) {
    return this.http.get(this.url + 'get-one-employee/' + id , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  updateEmployee(id: any, data: object) {
    return this.http.put(this.url + 'update-employee/' + id, data, {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    })
  }
}
