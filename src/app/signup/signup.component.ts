import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

const configToast: {
  positionClass: string;
  tapToDismiss: boolean;
  easeTime: number;
} = {
  positionClass: 'toast-top-right',
  tapToDismiss: false,
  easeTime: 200,
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  areas: any = [];

  constructor(private authService: AuthService, private router: Router, private toast: ToastrService) {}

  onSubmit(dataForm: NgForm) {
    console.log(dataForm.value, 'dataForm.value');
    
    this.authService.signup(dataForm.value).subscribe((res: any) => {
      this.toast.success(`${res.message}!`, 'Thành công!', {
        ...configToast,
        progressAnimation: 'decreasing',
      });

      this.router.navigate(['login'])
    }, err => this.toast.error(`${err.error.message}!`, 'Thất bại!', {
      ...configToast,
      progressAnimation: 'decreasing',
    }))
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
