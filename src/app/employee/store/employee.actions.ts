import { Employee } from '../model/employee.model';

export class AddEmployee {
  static readonly type = '[Employee ] Add';

  constructor(public payload: Employee ) {
  }
}

export class GetEmployees {
  static readonly type = '[Employee] Get';
}

export class UpdateEmployee {
  static readonly type = '[Employee] Update';

  constructor(public payload: Employee, public id: string) {
  }
}

export class DeleteEmployee {
  static readonly type = '[Employee] Delete';

  constructor(public id: string) {
  }
}
