import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";
import {MatDialogModule} from '@angular/material/dialog';
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {AppComponent} from './app.component';
import {ServiceComponent} from './service/service.component';
import {EmployeeComponent} from './employee/employee.component';
import {HttpClientModule} from "@angular/common/http";
import {ClientComponent} from './client/client.component';
import {OrderComponent} from './order/order.component';
import {NewOrderComponent} from './new-order/new-order.component';
import {FormsModule} from "@angular/forms";
import {AddEmployeeComponent} from './employee/add-employee/add-employee.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {EmployeeService} from "./employee/employee.service";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";


const routes: Routes = [
  // {path: '', component: OrderComponent},
  // {path: '', redirectTo: 'add-employee', pathMatch: 'full'},
  {path: 'new-order', component: NewOrderComponent},
  {path: 'order', component: OrderComponent},
  {path: 'client', component: ClientComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'employee', component: EmployeeComponent},
  {path: 'add-employee', component: AddEmployeeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    EmployeeComponent,
    ClientComponent,
    OrderComponent,
    NewOrderComponent,
    AddEmployeeComponent
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
  exports: [
    MatDialogModule,
    MatToolbarModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
