import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { ManageAreaComponent } from './manage-area/manage-area.component';
import { RoleService } from '../services/role.service';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [RoleService], data: {role: 2}},
  { path: 'leader/manage-employee', component: ManageEmployeeComponent, canActivate: [RoleService], data: {role: 2}},
  { path: 'leader/manage-project', component: ManageProjectComponent, canActivate: [RoleService], data: {role: 2}},
  { path: 'leader/manage-area', component: ManageAreaComponent, canActivate: [RoleService], data: {role: 2}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
