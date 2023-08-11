import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule, Routes} from "@angular/router";

import {AppComponent} from './app.component';
import {ServiceComponent} from './service/service.component';
import {EmployeeComponent} from './employee/employee.component';
import {HttpClientModule} from "@angular/common/http";
import {ClientComponent} from './client/client.component';
import {OrderComponent} from './order/order.component';
import {NewOrderComponent} from './new-order/new-order.component';

const appRoute: Routes = [
  // {path: '', component: ServiceComponent},
  // {path: '', redirectTo: 'service', pathMatch: 'full'},
  {path: 'new-order', component: NewOrderComponent},
  {path: 'order', component: OrderComponent},
  {path: 'client', component: ClientComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'employee', component: EmployeeComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    ServiceComponent,
    EmployeeComponent,
    ClientComponent,
    OrderComponent,
    NewOrderComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
