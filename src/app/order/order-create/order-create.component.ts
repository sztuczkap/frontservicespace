import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CatalogService, Service} from "../../service/catalog.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-order-create',
  templateUrl: './order-create.component.html',
  styleUrls: ['./order-create.component.css']
})
export class OrderCreateComponent implements OnInit {

  itemsForm: FormGroup;
  availableServices: Service[] = [];
  totalPrice: number = 0;

  clientDataForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]], // Walidacja email
    name: ['', Validators.required], // Walidacja wymagana
    phone: ['', Validators.required] // Walidacja wymagana
  });

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private router: Router
  ) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([])
    })
  }

  get items() {
    return this.itemsForm.get('items') as FormArray;
  }

  addItem(serviceId: number) {
    const item = new FormControl(serviceId);
    this.items.push(item);
    this.updateTotalPrice();
    console.log(this.items.value);
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTotalPrice();
    console.log(this.items.value);
  }

  ngOnInit(): void {
    this.catalogService.getCatalogService().subscribe((services: Service[]) => {
      this.availableServices = services.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
      this.updateTotalPrice();
    });
  }

  addFirstAvailableService() {
    if (this.availableServices.length > 0) {
      const firstServiceId = this.availableServices[0].id;
      this.addItem(firstServiceId);
    }
  }

  saveOrder() {
    if (this.clientDataForm.invalid || this.itemsForm.invalid) {
      // Nieprawidłowe dane w formularzu klienta lub formularzu usług, nie kontynuuj
      return;
    }

    // Pobierz dane klienta i usługi z formularza
    const selectedServices = this.itemsForm.value.items.map((item: { serviceId: number }) => ({
      serviceId: item
    }));
    const clientData = this.clientDataForm.value;

    // Stwórz obiekt zlecenia do zapisu
    const orderData = {
      items: selectedServices,
      client: {
        email: clientData.email,
        name: clientData.name,
        phone: clientData.phone
      }
    };

    // Użyj serwisu CatalogService do zapisania zlecenia
    this.catalogService.saveOrder(orderData).subscribe(
      (response) => {
        console.log('Zlecenie zostało zapisane:', response);
        // Tutaj możesz dodać obsługę sukcesu, np. wyświetlenie potwierdzenia
        this.router.navigate(['order']);
      },
      (error) => {
        console.error('Błąd podczas zapisywania zlecenia:', error);
        // Tutaj możesz dodać obsługę błędu, np. wyświetlenie komunikatu o błędzie
      }
    );
  }

  updateTotalPrice() {
    // Oblicz sumę cen wybranych usług i części
    let totalPrice = 0;
    for (const control of this.items.controls) {
      const serviceId = +control.value; // Konwersja do liczby
      const selectedService = this.availableServices.find(service => service.id === serviceId);
      if (selectedService) {
        totalPrice += selectedService.price + selectedService.priceParts;
      }
    }
    // Aktualizuj totalPrice
    this.totalPrice = totalPrice;
  }
}
