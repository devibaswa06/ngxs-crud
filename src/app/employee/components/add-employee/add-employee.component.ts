import {  AddEmployee } from '../../store/employee.actions';
import { Component, OnInit } from '@angular/core';
import * as uuid from 'uuid';
import { Store } from '@ngxs/store';
import { Employee } from '../../model/employee.model';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html'
})
export class AddEmployeeComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit() {
  }

  onSubmit(submittedForm) {

    if (submittedForm.invalid) {
      return;
    }

    const employee: Employee = {id: uuid.v4(), name: submittedForm.value.name, department: submittedForm.value.department};
    this.store.dispatch(new AddEmployee(employee));
  }

}
