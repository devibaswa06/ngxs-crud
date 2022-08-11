import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetEmployees, DeleteEmployee, UpdateEmployee, AddEmployee } from './employee.actions';
import {  EmployeeService } from '../services/employee.service';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Employee } from '../model/employee.model';

export class EmployeeStateModel {
    employees: Employee[];
    areEmployeesLoaded: boolean;
}

@State<EmployeeStateModel>({
    name: 'employees',
    defaults: {
     employees: [],
     areEmployeesLoaded: false
    }
})
export class EmployeeState {

    constructor(private employeeService: EmployeeService, private router: Router,private zone:NgZone) {
    }



    @Selector()
    static getEmployeeList(state: EmployeeStateModel) {
        return state.employees;
    }

    @Selector()
    static areEmployeesLoaded(state: EmployeeStateModel) {
        return state.areEmployeesLoaded;
    }

    @Action(GetEmployees)
    getEmployees({getState, setState}: StateContext<EmployeeStateModel>) {
      return this.employeeService.getAllEmployees().pipe(
        tap(result => {
          const state = getState();
          setState({
            ...state,
            employees: result,
            areEmployeesLoaded: true
          });
        })
      );
    }

    @Action(DeleteEmployee)
    deleteEmployee({getState, setState}: StateContext<EmployeeStateModel>, {id}: DeleteEmployee) {
      return this.employeeService.deleteEmployee(id).pipe(
        tap(result => {
          const state = getState();
          const filteredArray = state.employees.filter(item => item.id !== id);
          setState({
            ...state,
            employees: filteredArray,
          });
        })
      );
    }

    @Action(UpdateEmployee)
    updateEmployee({getState, setState}: StateContext<EmployeeStateModel>, {payload, id}: UpdateEmployee) {
      return this.employeeService.updateEmployee(id, payload).pipe(
        tap(result => {
          const state = getState();
          const employeesList = [...state.employees];
          const employeeIndex = employeesList.findIndex(item => item.id === id);

          employeesList[employeeIndex] = result;


          setState({
            ...state,
            employees: employeesList,
          });
        })
      );
    }

    @Action(AddEmployee)
    addEmployee({getState, patchState}: StateContext<EmployeeStateModel>, {payload}: AddEmployee) {
        return this.employeeService.addEmployee(payload).pipe(tap((result) => {
            const state = getState();
            
            patchState({
                employees: [...state.employees, result]
            });

           this.zone.run(() => {
            this.router.navigate(['/employees']);
        });
        }));
    }
}
