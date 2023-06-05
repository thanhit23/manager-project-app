import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  projects: any = [];
  isFetching: boolean = false;
  errorMessage: string = '';
  deleteProjectId: string = '';
  editProjectId: string = '';
  dataSearch: string = '';
  projectSearch: any = [];
  projectEdit = {
    projectName: '',
    dateStart: '',
    dateEnd: '',
    teamSize: '',
    budget: '',
    spending: '',
  }

  constructor(private projectService: ProjectService, private toast: ToastrService) {}

  // Thêm mới
  createProject(dataForm: NgForm) {
    this.projectService.createProject(dataForm.value).subscribe((res:any) => {
      this.getAllProject();

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
      
    }, error => {
      this.errorMessage = error.message
    })
  }

  // Lấy tất cả project
  getAllProject() {
    this.isFetching = true;
    this.projectService.getAllProject().subscribe((res:any) => {
      this.projects = res.projects;
      this.projectSearch = this.projects;
      
      this.isFetching = false
      
    }, err => {
      this.errorMessage = err.message
    })
  }

  // Xóa project
  deleteProject(projectId: string) {
    this.deleteProjectId = projectId;
  }

  confirmDeleteProject() {
    if (this.deleteProjectId) {
      this.projectService.deleteProject(this.deleteProjectId).subscribe((res:any) => {
        this.deleteProjectId = '';
        this.getAllProject();
  
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
  getOneProject(projectId: string) {
    this.editProjectId = projectId;
    this.projectService.getOneProject(projectId).subscribe((res:any) => {
      this.projectEdit.projectName = res.project.projectName;
      this.projectEdit.dateStart = res.project.dateStart.substr(0, 10);
      this.projectEdit.dateEnd = res.project.dateEnd.substr(0, 10);
      this.projectEdit.teamSize = res.project.teamSize;
      this.projectEdit.budget = res.project.budget;
      this.projectEdit.spending = res.project.spending;
      
    })
  }

  // Cập nhật project
  updateProject(dataFormEdit: NgForm) {
    if(this.editProjectId) {
      this.projectService.updateProject(this.editProjectId, dataFormEdit.value).subscribe((res:any) => {
        this.editProjectId = '';
        this.getAllProject();

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
    this.projects = this.projectSearch.filter((project: any) => project.projectName.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  // Phân trang
  pageSize: number = 3;
  currentPageIndex: number = 1;
  
  ngOnInit(): void {
      this.getAllProject();
  }
}
