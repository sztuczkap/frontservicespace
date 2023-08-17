import {Component, OnInit} from '@angular/core';
import {CatalogService, Service} from "./catalog.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  services: Service[];

  constructor(private catalogService: CatalogService) {
  }

  public getCatalogService(): void {
    this.catalogService.getCatalogService().subscribe(
      response => {
        console.log("Got service list: ");
        console.log(response);
        this.services = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  ngOnInit(): void {
    this.getCatalogService();
  }

}
