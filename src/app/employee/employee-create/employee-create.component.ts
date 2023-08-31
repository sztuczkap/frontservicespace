import {Component} from '@angular/core';
import {EmployeeService} from "../employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent {

  constructor(private employeeService: EmployeeService) {
  }

  name!: string
  lastName!: string
  position!: string

  isLoading: boolean = false;
  loadingTitle: string = 'Wczytywanie';
  errors: any = [];

  saveEmployee() {
    this.isLoading = true;
    this.loadingTitle = 'Zapisywanie'
    var inputData = {
      name: this.name,
      lastName: this.lastName,
      position: this.position
    }

    this.employeeService.saveEmployee(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'response')
        this.isLoading = false;
        this.name = '';
        this.lastName = '';
        this.position = '';

      },
      error: (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
        this.isLoading = false
        console.error(err.message)
      }
    })


  }


}
