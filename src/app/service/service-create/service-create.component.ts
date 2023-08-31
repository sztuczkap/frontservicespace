import {Component} from '@angular/core';
import {CatalogService} from "../catalog.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-service-create',
  templateUrl: './service-create.component.html',
  styleUrls: ['./service-create.component.css']
})
export class ServiceCreateComponent {

  constructor(private catalogService: CatalogService) {
  }

  serviceName!: string
  repairTime!: string
  guarantee!: string
  price!: number
  priceParts!: number
  comment!: string
  symptoms!: string

  isLoading: boolean = false;
  loadingTitle: string = 'Wczytywanie';
  errors: any = [];


  saveService() {
    this.isLoading = true;
    this.loadingTitle = 'Zapisywanie'
    var inputData = {
      serviceName: this.serviceName,
      repairTime: this.repairTime,
      guarantee: this.guarantee,
      price: this.price,
      priceParts: this.priceParts,
      comment: this.comment,
      symptoms: this.symptoms
    }

    this.catalogService.saveService(inputData).subscribe({
      next: (res: any) => {
        console.log(res, 'response')
        this.isLoading = false;
        // alert(res.message);
        this.serviceName = '';
        this.repairTime = '';
        this.guarantee = '';
        this.price = 0.00;
        this.priceParts = 0.00;
        this.comment = '';
        this.symptoms = '';
      },
      error: (err: HttpErrorResponse) => {
        this.errors = err.error.errors;
        this.isLoading = false
        // console.log(this.errors, 'errors')
        console.error(err.message)
      }
    })
  }
}
