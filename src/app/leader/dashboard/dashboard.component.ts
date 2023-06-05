import decode from 'jwt-decode';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  user: any;
  token: string = '';

  employees = [];
  projects: any = [];
  projectId: string = '';
  projectById: any = {};
  tasks: any = [];
  taskProcessing: any = [];
  totalBudgetProject: number = 0;
  empAreaEast: any = [];
  empBusyAreaEast: any = [];
  empAreaWest: any = [];
  empBusyAreaWest: any = [];
  empAreaSouth: any = [];
  empBusyAreaSouth: any = [];
  empAreaNorth: any = [];
  empBusyAreaNorth: any = [];

  constructor(private authService: AuthService, private employeeService: EmployeeService, private projectService: ProjectService, private taskService: TaskService) {}

  getInfoUser() {
    this.token = this.authService.getToken();

    if (this.token) {
      this.user = decode(this.token);
    }
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((res: any) => {
      this.employees = res.employee;
      // Tính số nhân viên từng khu vực
      this.empAreaEast = res.employee.filter((employee: any) => employee.area.nameArea === 'East');
      this.empAreaWest = res.employee.filter((employee: any) => employee.area.nameArea === 'West');
      this.empAreaSouth = res.employee.filter((employee: any) => employee.area.nameArea === 'South');
      this.empAreaNorth = res.employee.filter((employee: any) => employee.area.nameArea === 'North');

      // Lọc ra nhân viên tạm nghĩ từng khu vực
      this.empBusyAreaEast = this.empAreaEast.filter((employee: any) => employee.status === 'Busy');
      this.empBusyAreaWest = this.empAreaWest.filter((employee: any) => employee.status === 'Busy');
      this.empBusyAreaSouth = this.empAreaSouth.filter((employee: any) => employee.status === 'Busy');
      this.empBusyAreaNorth = this.empAreaNorth.filter((employee: any) => employee.status === 'Busy');
      
    })
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe((res: any) => {
      this.projects = res.projects;
      if(this.projects.length > 0) {
        this.projectId = this.projects[0]._id;
        this.selectProject(this.projectId);
      }
      
      res.projects.forEach((project: any) => {
        this.totalBudgetProject += project.budget;
        
      });
    })
  }

  selectProject(projectId: string) {
    this.projectId = projectId;

    if(this.projectId) {
      this.projectService.getOneProject(this.projectId).subscribe((res: any) => {
        this.projectById = res.project;     
      })
    }
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe((res: any) => {
      this.taskProcessing = res.tasks.filter((task: any) => task.status == 'Processing');
    })
  }

  ngOnInit(): void {
    this.getInfoUser();
    this.getAllEmployee();
    this.getAllProject();
    this.getAllTask();
  }
}
