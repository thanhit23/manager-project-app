import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AuthService } from './auth.service';
import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  getAllTask() {
    return this.http.get(
      env.BASE_URL + '/v1/task',
      { headers: this.authService.setTokenHeaders() }
    );
  }

  createTask(data: object) {
    return this.http.post(
      env.BASE_URL + '/v1/task',
      data,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  deleteTask(id: string) {
    return this.http.delete(
      env.BASE_URL + '/v1/task/' + id,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  getOneTask(id: string) {
    return this.http.get(
      env.BASE_URL + '/v1/task/' + id,
      { headers: this.authService.setTokenHeaders() }
    );
  }

  updateTask(id: string, data: object) {
    return this.http.put(
      env.BASE_URL + '/v1/task/' + id,
      data,
      { headers: this.authService.setTokenHeaders() }
    );
  }
}
