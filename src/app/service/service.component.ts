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
  // public searchOption: string = 'Objawy:';
  // public searchTerm: string = '';
  public filteredServices: Service[] = [];
  searchCriteria: string = ''; // Przechowuje aktualną wartość wprowadzoną w pole wyszukiwania
  filterType: 'serviceName' | 'symptoms' = 'symptoms';
  allServices: Service[] = [];


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
        console.log("Otrzymano listę usług: ");
        console.log(response);
        this.allServices = response.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
        this.services = [...this.allServices];
        this.isLoading = false;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }


  filterServices(): void {
    console.log(this.filterType, this.searchCriteria);
    if (this.searchCriteria) {
      this.services = this.allServices.filter(service =>
        service[this.filterType].toLowerCase().includes(this.searchCriteria.toLowerCase())
      );
    } else {
      this.services = [...this.allServices];  // Kiedy pole wyszukiwania jest puste, przywróć pełną listę usług
    }
  }

  ngOnInit(): void {
    this.getCatalogService();
    this.filteredServices = this.services;
  }

  onFilterTypeChange(value: any): void {
    console.log("Zmieniono wartość filterType na:", value);
  }

  handleSelectChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.filterType = selectElement.value as 'symptoms' | 'serviceName';
  }

}
