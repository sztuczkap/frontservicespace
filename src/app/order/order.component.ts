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
  orderStatuses: string[] = ['NEW', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'];

  constructor(private catalogOrder: OrderService) {
  }

  public getCatalogOrder(): void {
    this.catalogOrder.getCatalogOrder().subscribe(
      response => {
        console.log("Got order list: ");
        console.log(response);
        this.orders = this.sortOrdersByStatus(response);
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  sortOrdersByStatus(orders: Order[]): Order[] {
    return orders.sort((a, b) => {
      // Pierwszy krok: sortuj według statusu
      const statusComparison = this.orderStatuses.indexOf(a.status) - this.orderStatuses.indexOf(b.status);
      if (statusComparison !== 0) {
        return statusComparison;
      }

      // Drugi krok: sortuj według daty jeśli statusy są takie same
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA.getTime() - dateB.getTime(); // dla sortowania od najstarszych do najnowszych
      // return dateB.getTime() - dateA.getTime(); //  od najnowszych do najstarszych
    });
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
