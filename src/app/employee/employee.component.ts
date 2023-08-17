import {Component, OnInit, ViewChild} from '@angular/core';
import {Employee, EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  constructor(private employeeService: EmployeeService) {
  }

  public getCatalogEmployee(): void {
    this.employeeService.getCatalogEmployee().subscribe(
      response => {
        console.log("Got employee list: ");
        console.log(response);
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  ngOnInit(): void {
    this.getCatalogEmployee();
  }

}
