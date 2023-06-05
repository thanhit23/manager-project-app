import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.css']
})
export class ManageTaskComponent implements OnInit {

  tasks: any = [];
  projects: any = [];
  employees: any = [];
  isFetching: boolean = false;
  errorMessage: string = '';
  deleteTaskId: string = '';
  editTaskId: string = '';
  dataSearch: string = '';
  taskSearch: any = [];

  taskEdit = {
    taskName: '',
    dateStart: '',
    project: '',
    priority: '',
    assignedTo: '',
    status: 0,
    description: ''
  }

  constructor(private taskService: TaskService, private projectService: ProjectService, private employeeService: EmployeeService, private toast: ToastrService) {}

  // Lấy tất cả các task
  getAllTask() {
    this.isFetching = true;
    this.taskService.getAllTask().subscribe((res:any) => {
      this.tasks = res.data;
      
      this.taskSearch = this.tasks;

      this.isFetching = false
      
    }, err => {
      this.errorMessage = err.message
    })
  }

  // Create Task
  createTask(dataForm: NgForm) {
    this.taskService.createTask(dataForm.value).subscribe((res:any) => {
      this.getAllTask();

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
      console.log(error);
      
      this.errorMessage = error.message
    })
  }

  // Xóa task
  deleteTask(taskId: string) {
    this.deleteTaskId = taskId;
  }

  confirmDeleteTask() {
    if (this.deleteTaskId) {
      this.taskService.deleteTask(this.deleteTaskId).subscribe((res: any) => {
        this.deleteTaskId = '';
        this.getAllTask();
  
        this.toast.success(`${res.message}`, 'Success!', {
          progressAnimation: 'decreasing',
          positionClass: 'toast-top-right',
          tapToDismiss: false,
          easeTime: 200
        });

      }, err => {
        this.errorMessage = err.message
      })
    }
  }

   // Lấy project theo id
  getOneTask(taskId: string) {
    this.editTaskId = taskId;

    this.taskService.getOneTask(taskId).subscribe((res:any) => {
      const { data: { name, description, createdAt, priority, status, project, user } } = res;
      
      this.taskEdit.taskName = name;
      this.taskEdit.dateStart = createdAt.substr(0, 10);
      this.taskEdit.project = project._id;
      this.taskEdit.priority = priority;
      this.taskEdit.assignedTo = user._id;
      this.taskEdit.status = status;
      this.taskEdit.description = description;
    })
  }

  // Cập nhật task
  updateTask(dataFormEdit: NgForm) {
    if(this.editTaskId) {
      this.taskService.updateTask(this.editTaskId, dataFormEdit.value).subscribe((res:any) => {
        this.editTaskId = '';
        this.getAllTask();

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
        console.log(err);
        
        this.errorMessage = err.message;
      })
    }
    
  }

  // Lấy tất cả dự án
  getAllProject() {
    this.projectService.getAllProject().subscribe((res: any) => {
      this.projects = res.data;
    }, err => {
      this.errorMessage = err.message
    })
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((res: any) => {
      this.employees = res.data.filter((emp: any) => emp.status === true);
      
    }, err => {
      this.errorMessage = err.message
    })
  }

  get listFilter() {
    return this.dataSearch;
  }

  set listFilter(value: string) {
    this.dataSearch = value;
    
    this.tasks = this.taskSearch.filter((task: any) => task.name.toLowerCase().includes(this.listFilter.toLowerCase()));
  }

  pageSize: number = 3;
  currentPageIndex: number = 1;

  ngOnInit(): void {
    this.getAllTask();
    this.getAllProject();
    this.getAllEmployee();
  }
}
