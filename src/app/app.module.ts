import { EmployeeModule } from './employee/employee.module';
import { AddEmployeeComponent } from './employee/components/add-employee/add-employee.component';
import {  EmployeesListComponent } from './employee/components/employees-list/employees-list.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { EmployeeState } from './employee/store/employee.state';

const routes = [
  {
    path: 'employees',
    component: EmployeesListComponent
  },
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: '**', redirectTo: 'employees'}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    NgxsModule.forRoot([
      EmployeeState
    ]),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    EmployeeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
