import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AuthService } from './auth.service';
import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  constructor(private http: HttpClient, private authService: AuthService) { }

  getAllEmployee() {
    return this.http.get(
      env.BASE_URL + '/v1/employee',
     { headers: this.authService.setTokenHeaders() }
    );
  }

  updateProfile(id: string, data: object) {
    return this.http.put(
      env.BASE_URL + '/v1/employee/' + id,
      data,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  deleteEmployee(id: string) {
    return this.http.delete(
      env.BASE_URL + '/v1/employee/' + id,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  getOneEmployee(id: any) {
    return this.http.get(
      env.BASE_URL + '/v1/employee/' + id,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  updateEmployee(id: any, data: object) {
    return this.http.put(
      env.BASE_URL + '/v1/employee/' + id,
      data,
      { headers: this.authService.setTokenHeaders() }
    )
  }
}
