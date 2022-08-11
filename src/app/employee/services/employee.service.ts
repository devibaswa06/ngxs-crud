import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { Employee } from '../model/employee.model';



@Injectable()
export class EmployeeService {

  http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  getAllEmployees(): Observable<Employee[]> {

    const myData =  [{"id":"be376d12-8535-45c0-8e5c-09f6651873cb","name":"Anand","department":"IT"},{"id":"ad98c9bf-fb44-4283-8325-788eaaac8b07","name":"Ramu B","department":"HR"},{"id":"fb244413-9ffa-4f3e-ab03-679932c135ba","name":"Pavan B","department":"Admin"}] as Employee[];
return of(myData);
    
  }

  addEmployee(employee: Employee): Observable<Employee> {
    let crateObj = {
      "id":employee.id,
      "name":employee.name,
      "department": employee.department
   }
   return of(crateObj);
   
  }

  deleteEmployee(empId: string): Observable<any> {
    return of(empId);
   
  }

  updateEmployee(empId: string | number, employee: Employee): Observable<any> {
   let updateObj = {
     "id":empId,
     "name":employee.name,
     "department": employee.department
  }
     return  of(updateObj);
  
  }
}
