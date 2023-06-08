import decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { ROLE } from '../../constants/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) {}

  onSubmit(data: NgForm) {
    this.authService.login(data.value).subscribe((res: any) => {
      const { data: { tokens: { access } }, message } = res;
      
      this.authService.setToken(access);

      localStorage.setItem('accessToken', JSON.stringify(access));

      const user: any = decode(access);

      this.authService.loginSuccess.emit();

      this.toast.success(`${message}!`, 'Thành công!', {
        progressAnimation: 'decreasing',
        positionClass: 'toast-top-right',
        tapToDismiss: false,
        easeTime: 200
      });

      if(user.role === ROLE.leader.id) {
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['employee/manage-task']);
      }

    }, err => {
      this.toast.error(`${err.error.message}!`, 'Thất bại!', {
        progressAnimation: 'decreasing',
        positionClass: 'toast-top-right',
        tapToDismiss: false,
        easeTime: 200,
      });
    })
  }

  ngOnInit(): void {
    this.authService.getMe();
  }
}
