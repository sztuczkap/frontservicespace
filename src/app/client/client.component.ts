import {Component, OnInit} from '@angular/core';
import {Client, ClientService} from "./client.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  clients: Client[];

  constructor(private clientService: ClientService) {
  }

  public getCatalogClient(): void {
    this.clientService.getCatalogClient().subscribe(
      response => {
        console.log("Got employee list: ");
        console.log(response);
        this.clients = response;
      },
      (error: HttpErrorResponse) => {
        console.error(error.message)
      })
  }

  ngOnInit(): void {
    this.getCatalogClient();
  }

}
