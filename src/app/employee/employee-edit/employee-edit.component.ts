import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService} from "../../service/catalog.service";
import {EmployeeService} from "../employee.service";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{

  employeeId!: any;
  employee!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Wczytywanie';
  errors: any = [];

  constructor(private route: ActivatedRoute, private employeeService: EmployeeService) {
  }

  ngOnInit(): void {

    this.employeeId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.employeeService.getEmployee(this.employeeId).subscribe(res => {
      console.log(res)
      this.employee = res
      this.isLoading = false
    });
  }

  updateEmployee() {
    var inputdata = {
      name: this.employee.name,
      lastName: this.employee.lastName,
      position: this.employee.position

    }

    this.isLoading = true;

    this.employeeService.updateEmployee(inputdata, this.employeeId).subscribe({
      next: (res: any) => {
        console.log(res);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err)
        this.errors = err.error.errors;
        this.isLoading = false;
      }
    });
  }

}
