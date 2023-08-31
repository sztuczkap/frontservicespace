import {Component, Inject} from '@angular/core';
import { Router } from '@angular/router';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {EmployeeService} from "../employee.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Employee} from "../employee.model";

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {

  employeeForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Employee,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router,
    private dialogRef: MatDialogRef<AddEmployeeComponent>
  ) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  getEmployees(){
    this.employeeService.getEmployees()
  }

  onClear() {
    this.employeeForm.reset();
  }

  onSubmit(): void {
    if (this.employeeForm.valid) {
      const newEmployee = this.employeeForm.value as Employee;
      this.employeeService.createEmployee(newEmployee).subscribe({
        next: (response) => {
          console.log('Utworzono pracownika:', response);
          this.employeeForm.reset();
          // this.router.navigate(['/employee']);
          this.dialogRef.close();
        },
        error: (error) => {
          console.error('Błąd podczas tworzenia pracownika:', error);
        }
      });
    }
  }

  ngOnInit(): void {
    if (this.data) {
      // wypełnienie formularza danymi pracownika
      this.employeeForm.setValue({
        $key: this.data.id,
        name: this.data.name,
        lastName: this.data.lastName,
        position: this.data.position
      });
    }
  }

}
