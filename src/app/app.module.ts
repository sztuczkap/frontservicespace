import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";


import {AppComponent} from './app.component';
import {ServiceComponent} from './service/service.component';
import {EmployeeComponent} from './employee/employee.component';
import {ClientComponent} from './client/client.component';
import {OrderComponent} from './order/order.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {EmployeeService} from "./employee/employee.service";
import {ServiceCreateComponent} from './service/service-create/service-create.component';
import { LoaderComponent } from './loader/loader.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';
import { EmployeeCreateComponent } from './employee/employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee/employee-edit/employee-edit.component';



const routes: Routes = [
  // {path: '', component: OrderComponent},
  // {path: '', redirectTo: 'add-employee', pathMatch: 'full'},
  {path: 'new-order', component: NewOrderComponent},
  {path: 'order', component: OrderComponent},
  {path: 'client', component: ClientComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'service-create', component: ServiceCreateComponent},
  {path: 'catalog/:id', component: ServiceEditComponent},
  {path: 'clients/:id', component: ClientEditComponent},
  {path: 'employee-create', component: EmployeeCreateComponent},
  {path: 'employees/:id', component:EmployeeEditComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    EmployeeComponent,
    ClientComponent,
    OrderComponent,
    NewOrderComponent,
    ServiceCreateComponent,
    LoaderComponent,
    ServiceEditComponent,
    ClientEditComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDialogModule,
    ReactiveFormsModule,

  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
