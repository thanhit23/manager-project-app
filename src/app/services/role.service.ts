import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const role = route.data['role'];
    const token = this.authService.getToken();

    let tokenPayload: any;
    if(token) {
      tokenPayload = decode(token);
    }
    
    if(!this.authService.isLoggedIn()) {
      this.router.navigate(['login']);
      return false;

    } else if(tokenPayload.user.role !== role) {
      this.router.navigate(['forbidden']);
      return false;

    } 

    return true;
  }
}
