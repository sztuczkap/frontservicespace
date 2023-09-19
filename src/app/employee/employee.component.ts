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
        console.log("Otrzymano listę pracowników: ");
        console.log(response);
        this.employees = response.sort((a, b) => {
          // Porównanie nazwisk, a następnie imion w przypadku takich samych nazwisk
          const comparison = a.lastName.localeCompare(b.lastName, 'pl');
          return comparison !== 0 ? comparison : a.name.localeCompare(b.name, 'pl');
        });
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      }
    )
  }


  ngOnInit(): void {
    this.getCatalogEmployee();
  }
}
