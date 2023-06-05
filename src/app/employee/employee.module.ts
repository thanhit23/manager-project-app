import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { ManageTaskComponent } from './manage-task/manage-task.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ManageTaskComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    EmployeeRoutingModule,
    FormsModule
  ]
})
export class EmployeeModule { }
