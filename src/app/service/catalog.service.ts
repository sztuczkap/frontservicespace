import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";



@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiServerUrl = environment.apiBaseUrl;
  private orderData: any;
  private _updatedOrderData: { client: { phone: any; name: any; email: any }; items: any };

  constructor(private http: HttpClient) {
  }

  deleteService(serviceId: Number){
    return this.http.delete(`${this.apiServerUrl}/catalog/${serviceId}`)
  }

  updateService(inputData: object, serviceId: Number) {
    return this.http.put(`${this.apiServerUrl}/catalog/${serviceId}`, inputData)
  }

  getService(serviceId: number) {
    return this.http.get(`${this.apiServerUrl}/catalog/${serviceId}`)
  }

  saveService(inputData: object) {
    return this.http.post(`${this.apiServerUrl}/catalog`, inputData)
  }

  public getCatalogService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiServerUrl}/catalog`)
  }

  saveOrder(orderData: {  items: any; client: { phone: any; name: any; email: any }; }) {
    return this.http.post(`${this.apiServerUrl}/orders`, orderData)
  }

  getOrderById(orderId: number | null): Observable<Order> {
    return this.http.get<Order>(`${this.apiServerUrl}/orders/${orderId}`);
  }

  // updateOrder(orderId: number | null, updatedOrderData: { client: { phone: any; name: any; email: any }; items: any }) {
  //   this._updatedOrderData = updatedOrderData;
  //   return this.http.put(`${this.apiServerUrl}/orders/${this.orderData.orderId}`, this.orderData);
  // }

  updateOrder(orderId: number | null, updatedOrderData: { client: { phone: any; name: any; email: any }; items: any }) {
    if (orderId === null) {
      throw new Error("Invalid orderId provided");
    }
    this._updatedOrderData = updatedOrderData;
    return this.http.put(`${this.apiServerUrl}/orders/${orderId}`, this._updatedOrderData);
  }


  // assignEmployeeToOrder(orderId: number, employeeId: string): Observable<any> {
  //   return this.http.put(`${this.apiServerUrl}/orders/${orderId}/employee`, { employeeId: employeeId });
  // }

  assignEmployeeToOrder(orderId: number | null, employeeId: string): Observable<any> {
    if (!orderId) {
      throw new Error('OrderId is null or undefined.');
    }

    const body = +employeeId;  // Konwersja na liczbę

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.apiServerUrl}/orders/${orderId}/employee`, body, { headers: headers });
  }

  updateOrderStatus(orderId: number | null, status: string): Observable<any> {
    if (!orderId) {
      throw new Error('OrderId is null or undefined.');
    }

    const body = { status: status };
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(`${this.apiServerUrl}/orders/${orderId}/status`, body, { headers: headers });
  }

  public updateOrderItems(orderId: number, items: any[]): Observable<Order> {
    return this.http.put<Order>(`${this.apiServerUrl}/orders/${orderId}/items`, items);
  }
}

export interface Service {
  id: number;
  serviceName: string;
  repairTime: string;
  guarantee: string;
  price: number;
  priceParts: number;
  comment: string;
  symptoms: string;
  getServices(): any;
}

export interface Order {
  status: string;
  id: number;
  items: Service[];
  client: { phone: any; name: any; email: any };
}
