import {Component, OnInit} from '@angular/core';
import {Order, Items, OrderService} from "./order.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  orders: Order[];

  constructor(private catalogOrder: OrderService) {
  }

  public getCatalogOrder(): void {
    this.catalogOrder.getCatalogOrder().subscribe(
      response => {
        console.log("Got order list: ");
        console.log(response);
        this.orders = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  ngOnInit(): void {
    this.getCatalogOrder();
  }

}
