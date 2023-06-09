import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AreaService } from 'src/app/services/area.service';
import { configToast } from '../../../constants/toastMessage';

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

  createArea(dataForm: NgForm) {
    this.areaService.createArea(dataForm.value).subscribe((res:any) => {
      this.getAllArea();

      this.toast.success(`${res.message}`, 'Success!', configToast);
      dataForm.reset();
    }, err => {
      this.toast.error(
        `${err.error.message}`,
        'Success!',
        { ...configToast, progressAnimation: 'decreasing', }
      );
    })
  }

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

  deleteArea(projectId: string) {
    this.deleteAreaId = projectId;
  }

  confirmDeleteArea() {
    if (this.deleteAreaId) {
      this.areaService.deleteArea(this.deleteAreaId).subscribe((res:any) => {
        this.deleteAreaId = '';
        this.getAllArea();
  
        this.toast.success(`${res.message}`, 'Success!', configToast);
      }, err => {
        this.errorMessage = err.message
      })
    }
  }

  getOneArea(areaId: string) {
    this.editAreaId = areaId;
    this.areaService.getOneArea(areaId).subscribe((res:any) => {
      this.areaEdit.nameArea = res.area.nameArea;
    })
  }

  updateArea(dataFormEdit: NgForm) {
    if(this.editAreaId) {
      this.areaService.updateArea(this.editAreaId, dataFormEdit.value).subscribe((res:any) => {
        this.editAreaId = '';
        this.getAllArea();

        this.toast.success(`${res.message}`, 'Success!', configToast);
      }, err => {
        this.toast.error(`${err.error.message}`, 'Success!', configToast);
      })
    }
  }

  get listFilter() {
    return this.dataSearch;
  }

  set listFilter(value: string) {
    this.dataSearch = value;
    this.areas = this.areaSearch.filter((area: any) => area.nameArea.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  pageSize: number = 4;
  currentPageIndex: number = 1;

  ngOnInit(): void {
      this.getAllArea();
  }
}
