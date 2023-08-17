import {Component, OnInit} from '@angular/core';
import {Employee} from "../employee/employee.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  model: Partial<Employee>;

  constructor() {
  }

  ngOnInit(): void {

  }

  send() {
    console.log(this.model)
  }
}
