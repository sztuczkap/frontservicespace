import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environment/environment";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  private apiServerUrl = environment.apiBaseUrl;

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
