import {Injectable} from '@angular/core';
import {environment} from "../../environment/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {
  }


  deleteEmployee(employeeId: Number) {
    return this.http.delete<void>(`${this.apiServerUrl}/employees/${employeeId}`);
  }

  updateEmployee(inputData: object, employeeId: Number) {
    return this.http.put(`${this.apiServerUrl}/employees/${employeeId}`, inputData);
  }

  getEmployee(employeeId: number) {
    return this.http.get(`${this.apiServerUrl}/employees/${employeeId}`);
  }

  saveEmployee(inputData: object) {
    return this.http.post(`${this.apiServerUrl}/employees`, inputData)
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employees`);
  }

}

export interface Employee {
  id: number;
  name: string;
  lastName: string;
  position: string;
}
