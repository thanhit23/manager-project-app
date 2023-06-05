import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { AuthService } from '../services/auth.service';

const routes: Routes = [
  { path: 'employee/manage-task', component: ManageTaskComponent, canActivate: [AuthService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
