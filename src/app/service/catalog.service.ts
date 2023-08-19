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

  public getCatalogService(): Observable<Service[]> {
    return this.http.get<Service[]>(`${this.apiServerUrl}/catalog`)
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
}

