import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {CatalogService, Service} from "../catalog.service";

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.css']
})
export class ServiceEditComponent implements OnInit {

  serviceId!: any;
  service!: any;
  isLoading: boolean = false;
  loadingTitle: string = 'Wczytywanie';
  errors: any = [];

  constructor(private route: ActivatedRoute, private catalogService: CatalogService) {
  }

  ngOnInit(): void {
    this.serviceId = this.route.snapshot.paramMap.get('id');
    // alert(this.serviceId);
    this.isLoading = true;
    this.catalogService.getService(this.serviceId).subscribe(res => {
      console.log(res)
      this.service = res
      this.isLoading = false
    });
  }

  updateService() {
    var inputdata = {
      serviceName: this.service.serviceName,
      repairTime: this.service.repairTime,
      guarantee: this.service.guarantee,
      price: this.service.price,
      priceParts: this.service.priceParts,
      comment: this.service.comment,
      symptoms: this.service.symptoms
    }

    this.isLoading = true;

    this.catalogService.updateService(inputdata, this.serviceId).subscribe({
      next: (res: any) => {
        console.log(res);
        // alert(res.message)
        this.isLoading = false;
      },
      error: (err: any) => {
        console.log(err)
        this.errors = err.error.errors;
        this.isLoading = false;
      }
    });
  }
}
