import {Component} from '@angular/core';

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
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required]
    });
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
        },
        error: (error) => {
          console.error('Błąd podczas tworzenia pracownika:', error);
        }
      });
    }
  }


}
