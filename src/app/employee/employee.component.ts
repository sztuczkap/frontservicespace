import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "./employee.model";

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];

  @Input() employee: Employee;
  @Output() update = new EventEmitter<void>();

  constructor(
    private employeeService: EmployeeService
  ) {
  }

  public getCatalogEmployee(): void {
    this.employeeService.getEmployees().subscribe(
      response => {
        console.log("Got employee list: ");
        console.log(response);
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  save(): void {
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee.id, this.employee).subscribe(() => {
        this.update.emit();
      });
    } else {
      this.employeeService.addEmployee(this.employee).subscribe(() => {
        this.update.emit();
      });
    }
  }

  ngOnInit(): void {
    this.getCatalogEmployee();
  }
}
