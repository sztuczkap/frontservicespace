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

  public deleteOrder(orderId: number): void {
    this.catalogOrder.deleteOrder(orderId).subscribe(
      (response) => {
        console.log('Zlecenie zostało usunięte:', response);
        // Przeładuj stronę po usunięciu
        window.location.reload();
      },
      (error: HttpErrorResponse) => {
        console.error('Błąd podczas usuwania zlecenia:', error.message);
        // Tutaj możesz dodać obsługę błędu, np. wyświetlenie komunikatu o błędzie
      }
    );
  }


  public confirmDeleteOrder(orderId: number): void {
    const result = window.confirm("Czy na pewno chcesz usunąć to zlecenie?");
    if (result) {
      this.deleteOrder(orderId);
    }
  }

  ngOnInit(): void {
    this.getCatalogOrder();
  }

}
