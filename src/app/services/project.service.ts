import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { AuthService } from './auth.service';
import env from '../../constants/env.developer';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  url = 'https://be-angular.onrender.com/api/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createProject(data: object) {
    return this.http.post(this.url + 'add-project', data, {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  getAllProject() {
    return this.http.get(env.BASE_URL + '/v1/project' , { headers: this.authService.setTokenHeaders()  });
  }

  getOneProject(id: any) {
    return this.http.get(env.BASE_URL + '/v1/project/' + id , { headers: this.authService.setTokenHeaders() });
  }

  updateProject(id: any, data: object) {
    return this.http.put(this.url + 'update-project/' + id, data, {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    })
  }

  deleteProject(id: any) {
    return this.http.delete(this.url + 'delete-project/' + id , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }
}
