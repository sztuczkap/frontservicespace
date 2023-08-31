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
  isLoading: boolean = false;

  constructor(private catalogService: CatalogService) {
  }

  deleteService(event: any, serviceId: Number) {
    if (confirm('Czy na pewno usunąć?')) {
      // event.target.innerText = "Usuwanie..."
      this.catalogService.deleteService(serviceId).subscribe((res: any) => {
        this.getCatalogService();
      });
    }
  }

  public getCatalogService(): void {
    this.isLoading = true;
    this.catalogService.getCatalogService().subscribe(
      response => {
        console.log("Got service list: ");
        console.log(response);
        this.services = response;
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  ngOnInit(): void {
    this.getCatalogService();
  }

}
