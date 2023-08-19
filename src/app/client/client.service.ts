import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }

  public getCatalogClient(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiServerUrl}/clients`)
  }

}

export interface Client {
  id: number;
  email: string;
  name: string;
  phone: number;
}
