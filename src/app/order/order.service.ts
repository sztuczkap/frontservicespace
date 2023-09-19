import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }
  public getCatalogOrder(): Observable<Order[]> {
    return this.http.get<Order[]>(`${this.apiServerUrl}/orders`)
  }

  public deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiServerUrl}/orders/${orderId}`);
  }

  public getOrderById(orderId: number): Observable<Order> {
    return this.http.get<Order>(`${this.apiServerUrl}/orders/${orderId}`);
  }

  public updateOrder(orderId: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/orders/${orderId}`, order);
  }

  public getAvailableServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiServerUrl}/catalog`);
  }



}

export interface Order {
  id: number;
  status: string;
  items: Items[];
  client: Client;
  employee?: Employee;
  createdAt: any;
}

export interface Items {
  service: Service
}

export interface Service {
  id: number
  serviceName: string
  repairTime: string
  guarantee: string
  price: number
  priceParts: number
  comment: string
  symptoms: string
}

export interface Client {
  id: number
  email: string
  name: string
  phone: string
}

export interface Employee {
  id: number
  name: string
  lastName: string
  position: string
  createdAt: string
}
