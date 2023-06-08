import decode from 'jwt-decode';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { EmployeeService } from 'src/app/services/employee.service';
import { ProjectService } from 'src/app/services/project.service';
import { TaskService } from 'src/app/services/task.service';
import { AREA, STATUS } from '../../../constants/employee';

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
      const { user }: { user: object } = decode(this.token);
      this.user = user;
    }
  }

  getAllEmployee() {
    this.employeeService.getAllEmployee().subscribe((res: any) => {
      const { data } = res;
      this.employees = data;
      
      this.empAreaEast = data.filter(({ area }: { area: string }) => area === AREA.EAST.name);
      this.empAreaWest = data.filter(({ area }: { area: string }) => area === AREA.WEST.name);
      this.empAreaSouth = data.filter(({ area }: { area: string }) => area === AREA.SOUTH.name);
      this.empAreaNorth = data.filter(({ area }: { area: string }) => area === AREA.NORTH.name);

      this.empBusyAreaEast = this.empAreaEast.filter(({ status }: { status: string }) => status === STATUS.BUSY.name);
      this.empBusyAreaWest = this.empAreaWest.filter(({ status }: { status: string }) => status === STATUS.BUSY.name);
      this.empBusyAreaSouth = this.empAreaSouth.filter(({ status }: { status: string }) => status === STATUS.BUSY.name);
      this.empBusyAreaNorth = this.empAreaNorth.filter(({ status }: { status: string }) => status === STATUS.BUSY.name);
    })
  }

  getAllProject() {
    this.projectService.getAllProject().subscribe((res: any) => {
      const { data } = res;
      this.projects = data;
      
      if(this.projects.length > 0) {
        this.projectId = this.projects[0]._id;
        this.selectProject(this.projectId);
      }

      data.forEach(({ budget }: { budget: number }) => {
        this.totalBudgetProject += budget;
      });
    })
  }

  selectProject(projectId: string) {
    this.projectId = projectId;

    if(this.projectId) {
      this.projectService.getOneProject(this.projectId).subscribe((res: any) => {
        this.projectById = res.data;     
      })
    }
  }

  getAllTask() {
    this.taskService.getAllTask().subscribe((res: any) => {
      const { data } = res;
      this.taskProcessing = data.filter(({ status }: { status: string }) => status == 'Processing');
    })
  }

  ngOnInit(): void {
    this.getInfoUser();
    this.getAllEmployee();
    this.getAllProject();
    this.getAllTask();
  }
}
