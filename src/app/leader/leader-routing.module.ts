import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { AuthService } from '../services/auth.service';
import { ManageAreaComponent } from './manage-area/manage-area.component';
import { RoleService } from '../services/role.service';

const routes: Routes = [
  // { path: '', redirectTo: '/leader', pathMatch: 'full'},
  { path: '', component: DashboardComponent, canActivate: [RoleService], data: {role: 1}},
  { path: 'leader/manage-employee', component: ManageEmployeeComponent, canActivate: [RoleService], data: {role: 1}},
  { path: 'leader/manage-project', component: ManageProjectComponent, canActivate: [RoleService], data: {role: 1}},
  { path: 'leader/manage-area', component: ManageAreaComponent, canActivate: [RoleService], data: {role: 1}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaderRoutingModule { }
