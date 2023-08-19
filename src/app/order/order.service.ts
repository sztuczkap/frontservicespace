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
}

export interface Order {
  id: number;
  status: string;
  items: Items[];
  client: Client;
  employee: Employee
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
