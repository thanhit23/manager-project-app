import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';

@Component({
  selector: 'app-manage-area',
  templateUrl: './manage-area.component.html',
  styleUrls: ['./manage-area.component.css']
})
export class ManageAreaComponent implements OnInit {
  areas: any = [];
  isFetching: boolean = false;
  errorMessage: string = '';
  deleteAreaId: string = '';
  editAreaId: string = '';
  dataSearch: string = '';
  areaSearch: any = [];
  areaEdit = {
    nameArea: '',
  }

  constructor(private areaService: AreaService, private toast: ToastrService) {}

  // Thêm mới
  createArea(dataForm: NgForm) {
    this.areaService.createArea(dataForm.value).subscribe((res:any) => {
      this.getAllArea();

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

      dataForm.reset();
      
    }, err => {
      this.toast.error(`${err.error.message}`, 'Error!', {
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

  // Lấy tất cả project
  getAllArea() {
    this.isFetching = true;
    this.areaService.getAllArea().subscribe((res:any) => {
      this.areas = res.areas;
      this.areaSearch = this.areas;

      this.isFetching = false
      
    }, err => {
      this.errorMessage = err.message
    })
  }

  // Xóa project
  deleteArea(projectId: string) {
    this.deleteAreaId = projectId;
  }

  confirmDeleteArea() {
    if (this.deleteAreaId) {
      this.areaService.deleteArea(this.deleteAreaId).subscribe((res:any) => {
        this.deleteAreaId = '';
        this.getAllArea();
  
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

  // Lấy project theo id
  getOneArea(areaId: string) {
    this.editAreaId = areaId;
    this.areaService.getOneArea(areaId).subscribe((res:any) => {
      this.areaEdit.nameArea = res.area.nameArea;
    })
  }

  // Cập nhật project
  updateArea(dataFormEdit: NgForm) {
    if(this.editAreaId) {
      this.areaService.updateArea(this.editAreaId, dataFormEdit.value).subscribe((res:any) => {
        this.editAreaId = '';
        this.getAllArea();

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
        this.toast.error(`${err.error.message}`, 'Error!', {
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
  }

  // Lọc
  get listFilter() {
    return this.dataSearch;
  }

  set listFilter(value: string) {
    this.dataSearch = value;
    this.areas = this.areaSearch.filter((area: any) => area.nameArea.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  // Phân trang
  pageSize: number = 4;
  currentPageIndex: number = 1;

  ngOnInit(): void {
      this.getAllArea();
  }
}
