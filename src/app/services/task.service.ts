import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  
  headers = new HttpHeaders({ 'Authorization': `Bearer ${this.authService.getToken()}` })

  getAllTask() {
    return this.http.get(env.BASE_URL + '/v1/task', { headers: this.headers });
  }

  createTask(data: object) {
    return this.http.post(env.BASE_URL + '/v1/task', data, { headers: this.headers })
  }

  deleteTask(id: string) {
    return this.http.delete(env.BASE_URL + '/v1/task/' + id, { headers: this.headers })
  }

  getOneTask(id: string) {
    return this.http.get(env.BASE_URL + '/v1/task/' + id, { headers: this.headers });
  }

  updateTask(id: string, data: object) {
    return this.http.put(env.BASE_URL + '/v1/task/' + id, data, { headers: this.headers })
  }
}
