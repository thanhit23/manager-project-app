import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-manage-employee',
  templateUrl: './manage-employee.component.html',
  styleUrls: ['./manage-employee.component.css']
})
export class ManageEmployeeComponent implements OnInit {

  employees: any = [];
  isFetching: boolean = false;
  errorMessage: string = '';
  deleteEmployeeId: string = '';
  editEmployeeId: string = '';
  dataSearch: string = '';
  employeeSearch: any = [];
  employeeEdit = {
    name: '',
    email: '',
    phoneNumber: '',
    status: '',
    typeUser: '',
  }

  constructor(private employeeService: EmployeeService, private toast: ToastrService) {}

  getAllEmployee() {
    this.isFetching = true;
    this.employeeService.getAllEmployee().subscribe((res:any) => {
      this.employees = res.data;
      this.employeeSearch = this.employees;

      this.isFetching = false
      
    }, err => {
      this.errorMessage = err.message
    })
  }

  deleteEmployee(employeeId: string) {
    this.deleteEmployeeId = employeeId;
  }

  confirmDeleteEmployee() {
    if (this.deleteEmployeeId) {
      this.employeeService.deleteEmployee(this.deleteEmployeeId).subscribe((res:any) => {
        this.deleteEmployeeId = '';
        this.getAllEmployee();
  
        this.toast.success(`${res.message}`, 'Success!', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          positionClass: 'toast-top-right',
          enableHtml: true,
          tapToDismiss: false,
          easeTime: 200
        });
      }, err => {
        this.errorMessage = err.message
      })
    }
  }

  // Lấy employee theo id
  getOneEmployee(employeeId: string) {
    this.editEmployeeId = employeeId;
    this.employeeService.getOneEmployee(employeeId).subscribe((res:any) => {
      this.employeeEdit.name = res.employee.name;
      this.employeeEdit.email = res.employee.email;
      this.employeeEdit.phoneNumber = res.employee.phoneNumber;
      this.employeeEdit.status = res.employee.status;
      this.employeeEdit.typeUser = res.employee.typeUser;
    })
  }

  // Cập nhật employee
  updateEmployee(dataFormEdit: NgForm) {
    if(this.editEmployeeId) {
      this.employeeService.updateEmployee(this.editEmployeeId, dataFormEdit.value).subscribe((res:any) => {
        this.editEmployeeId = '';
        this.getAllEmployee();

        this.toast.success(`${res.message}`, 'Success!', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'decreasing',
          closeButton: true,
          positionClass: 'toast-top-right',
          enableHtml: true,
          tapToDismiss: false,
          easeTime: 200
        });
      }, err => {
        this.errorMessage = err.message
      })
    }
  }

  // Lọc
  get listFilter() {
    return this.dataSearch;
  }

  set listFilter(value: string) {
    this.dataSearch = value;
    this.employees = this.employeeSearch.filter((emp: any) => emp.name.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  // Phân trang
  pageSize: number = 4;
  currentPageIndex: number = 1;

  ngOnInit(): void {
      this.getAllEmployee();
  }

}
