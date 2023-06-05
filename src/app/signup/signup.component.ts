import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  areas: any = [];

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) {}

  onSubmit(dataForm: NgForm) {
    this.authService.signup(dataForm.value).subscribe((res: any) => {
      this.toast.success(`${res.message}!`, 'Thành công!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
        tapToDismiss: false,
        easeTime: 200
      });

      this.router.navigate(['login'])

    }, err => {
      this.toast.error(`${err.error.message}!`, 'Thất bại!', {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: 'decreasing',
        closeButton: true,
        positionClass: 'toast-top-right',
        enableHtml: true,
        tapToDismiss: false,
        easeTime: 200
      });
    })
  }

  getAllArea() {
    this.authService.getAllArea().subscribe((res: any) => {
      this.areas = res.areas;
    })
  }

  ngOnInit(): void {
      this.getAllArea();
  }

}
