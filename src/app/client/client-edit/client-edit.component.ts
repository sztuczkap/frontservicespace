import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ClientService} from "../client.service";

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {

  clientId: any;
  client!: any;

  isLoading: boolean = false;
  loadingTitle: string = '';
  errors: any = [];

  constructor(private route: ActivatedRoute, private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.clientService.getClient(this.clientId).subscribe(res => {
      console.log(res);
      this.client = res;
      this.isLoading = false
    });
  }

  updateClient() {

    var inputData = {
      email: this.client.email,
      name: this.client.name,
      phone: this.client.phone
    }

    this.isLoading = true;

    this.clientService.updateClient(inputData, this.clientId).subscribe({
      next: (res: any) => {
        console.log(res);
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
