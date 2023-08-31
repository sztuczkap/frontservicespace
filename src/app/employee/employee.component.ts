import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {EmployeeService} from "./employee.service";
import {HttpErrorResponse} from "@angular/common/http";
import {Employee} from "./employee.model";
import {MatDialog} from "@angular/material/dialog";
import {AddEmployeeComponent} from "./add-employee/add-employee.component";

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
    private employeeService: EmployeeService, private dialog: MatDialog
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

  deleteEmployee(employeeId: number | undefined): void {
    if (typeof employeeId === 'number') {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => {
          console.log('Pracownik został usunięty.');
          // Opcjonalnie: odśwież listę pracowników po usunięciu
          this.getCatalogEmployee();
        },
        (error: HttpErrorResponse) => {
          console.error('Błąd podczas usuwania pracownika:', error.message);
          if (error.status === 500) {
            window.alert('Nie można usunąć pracownika przypisanego do zlecenia.');
          }
        }
      );
    } else {
      console.error('Nie podano ID pracownika do usunięcia.');
    }
  }

  openAddEmployeeDialog(): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '50%',  // przykładowo 80% szerokości ekranu
      height: '50%',  // wysokość
      position: {
        top: '0',
        left: '25%'  // centruje okno dialogowe poziomo, gdy szerokość wynosi 80%
      }
    });
    dialogRef.afterClosed().subscribe(() => {
      this.getCatalogEmployee();  // odświeża listę pracowników po zamknięciu okna dialogowego
    });
  }

  openEditEmployeeDialog(emp: Employee): void {
    const dialogRef = this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      height: '50%',
      position: {
        top: '0',
        left: '25%'
      },
      data: emp  // przekazanie obiektu pracownika do okna dialogowego
    });

    dialogRef.afterClosed().subscribe(() => {
      this.getCatalogEmployee();  // odświeżenie listy pracowników po zamknięciu okna dialogowego
    });
  }

  ngOnInit(): void {
    this.getCatalogEmployee();
  }
}
