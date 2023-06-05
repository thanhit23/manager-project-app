import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  url = 'https://be-angular.onrender.com/api/';

  constructor(private http: HttpClient, private authService: AuthService) {}

  createArea(data: object) {
    return this.http.post(this.url + 'add-area', data, {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  getAllArea() {
    return this.http.get(this.url + 'getall-area' , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  getOneArea(id: any) {
    return this.http.get(this.url + 'get-one-area/' + id , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }

  updateArea(id: any, data: object) {
    return this.http.put(this.url + 'update-area/' + id, data, {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    })
  }

  deleteArea(id: any) {
    return this.http.delete(this.url + 'delete-area/' + id , {
      headers: new HttpHeaders().set('x-access-token', this.authService.getToken())
    });
  }
}
