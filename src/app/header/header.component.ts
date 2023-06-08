import { Component, OnChanges, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { Subscription } from 'rxjs';
import { OnDestroy } from '@angular/core';
import { EmployeeService } from '../services/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  user: any;
  token: string = '';
  private loginSuccessSubscription!: Subscription;

  constructor(private authService: AuthService, private employeeService: EmployeeService, private router: Router, private toast: ToastrService) {}

  getInfoUser() {
    this.token = this.authService.getToken();

    if (this.token) {
      const user: { user: {} } = decode(this.token);
      this.user = user?.user;
    }
  }

  logout() {
    localStorage.removeItem('accessToken');
    this.user = null;
    this.authService.setToken();
    this.router.navigate(['/login']);
  }

  updateProfile(id: string, dataForm: NgForm) {
    
    this.employeeService.updateProfile(id, dataForm.value).subscribe((res: any) => {

      this.toast.success(`${res.message}. Vui lòng đăng nhập lại!`, 'Success!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
        tapToDismiss: false,
        easeTime: 200
      });

      this.logout();
    })
  }

  ngOnInit(): void {
    this.getInfoUser();

    this.loginSuccessSubscription = this.authService.loginSuccess.subscribe(() => {
      this.getInfoUser();
    });
  }

  ngOnDestroy(): void {
    this.loginSuccessSubscription.unsubscribe();
  }
}
