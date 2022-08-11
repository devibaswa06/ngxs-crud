import { tap } from 'rxjs/operators';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, Subscription } from 'rxjs';
import { GetEmployees, DeleteEmployee, UpdateEmployee } from '../../store/employee.actions';
import {  EmployeeState } from '../../store/employee.state';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html'

})
export class EmployeesListComponent implements OnInit, OnDestroy {

  @Select(EmployeeState.getEmployeeList) employees$: Observable<Employee[]>;

  @Select(EmployeeState.areEmployeesLoaded) areEmployeesLoaded$;

  employeeToBeUpdated: Employee;

  isUpdateActivated = false;

  areEmployeesLoadedSub: Subscription;

  constructor(private store: Store) {
  }


  ngOnInit() {
    this.areEmployeesLoadedSub = this.areEmployeesLoaded$.pipe(
      tap((areEmployeesLoaded) => {
        if (!areEmployeesLoaded) {
          this.store.dispatch(new GetEmployees());
        }
      })
    ).subscribe(value => {
      
    });
  }

  ngOnDestroy() {
    this.areEmployeesLoadedSub.unsubscribe();
  }

  deleteEmployee(empId: string) {
    this.store.dispatch(new DeleteEmployee(empId));
  }

  showUpdateForm(employee: Employee) {
    this.employeeToBeUpdated = {...employee};
    this.isUpdateActivated = true;
  }

  updateEmployee(updateForm) {
    this.store.dispatch(new UpdateEmployee(updateForm.value, this.employeeToBeUpdated.id));

    this.isUpdateActivated = false;
    this.employeeToBeUpdated = null;
  }
}
