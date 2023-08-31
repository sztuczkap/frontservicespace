import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

import {AppComponent} from './app.component';
import {ServiceComponent} from './service/service.component';
import {EmployeeComponent} from './employee/employee.component';
import {ClientComponent} from './client/client.component';
import {OrderComponent} from './order/order.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import {EmployeeService} from "./employee/employee.service";
import {ServiceCreateComponent} from './service/service-create/service-create.component';
import { LoaderComponent } from './loader/loader.component';
import { ServiceEditComponent } from './service/service-edit/service-edit.component';
import { ClientEditComponent } from './client/client-edit/client-edit.component';



const routes: Routes = [
  // {path: '', component: OrderComponent},
  // {path: '', redirectTo: 'add-employee', pathMatch: 'full'},
  {path: 'new-order', component: NewOrderComponent},
  {path: 'order', component: OrderComponent},
  {path: 'client', component: ClientComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'add-employee', component: AddEmployeeComponent},
  {path: 'service-create', component: ServiceCreateComponent},
  {path: 'catalog/:id', component: ServiceEditComponent},
  {path: 'clients/:id', component: ClientEditComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    EmployeeComponent,
    ClientComponent,
    OrderComponent,
    NewOrderComponent,
    AddEmployeeComponent,
    ServiceCreateComponent,
    LoaderComponent,
    ServiceEditComponent,
    ClientEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    ReactiveFormsModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatButtonModule
  ],
  // exports: [
  //   MatDialogModule,
  //   MatToolbarModule,
  //   MatGridListModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatButtonModule,
  //   FormsModule
  // ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
