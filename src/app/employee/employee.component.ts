import {Component, OnInit} from '@angular/core';
import {Employee, EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";


@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[];
  isLoading: boolean = false;

  constructor(private employeeService: EmployeeService) {
  }

  deleteEmployee(event: any, employeeId: Number) {
    if (confirm('Czy na pewno usunąć?')) {
      // event.target.innerText = "Usuwanie..."
      this.employeeService.deleteEmployee(employeeId).subscribe((res: any) => {
        this.getCatalogEmployee();
      });
    }
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

  ngOnInit(): void {
    this.getCatalogEmployee();
  }
}
