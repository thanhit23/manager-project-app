import decode from 'jwt-decode';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';

import { ROLE } from '../../constants/role';
import { AuthService } from '../services/auth.service';
import { configToast } from '../../constants/toastMessage';

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

      this.toast.success(`${message}`, 'Success!', configToast);

      if(user.user.role === ROLE.leader.id) {
        console.log(user.user.role, 'user.user.role');
        
        this.router.navigate(['/']);
      } else {
        this.router.navigate(['employee/manage-task']);
      }

    },
    ({ error: { message }}) => this.toast.error(`${message}`, 'Error!', configToast))
  }

  ngOnInit(): void {
    this.authService.getMe();
  }
}
