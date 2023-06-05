import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaderRoutingModule } from './leader-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageEmployeeComponent } from './manage-employee/manage-employee.component';
import { ManageProjectComponent } from './manage-project/manage-project.component';
import { FormsModule } from '@angular/forms';
import { ManageAreaComponent } from './manage-area/manage-area.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DashboardComponent,
    ManageProjectComponent,
    ManageEmployeeComponent,
    ManageProjectComponent,
    ManageAreaComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    LeaderRoutingModule,
    FormsModule
  ]
})
export class LeaderModule { }
