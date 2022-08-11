import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import {  EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {  EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [EmployeesListComponent, AddEmployeeComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService],
  exports: [EmployeesListComponent, AddEmployeeComponent]
})
export class EmployeeModule { }
