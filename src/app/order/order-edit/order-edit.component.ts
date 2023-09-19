import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CatalogService, Service } from '../../service/catalog.service';
import { ActivatedRoute, Router } from '@angular/router';
import {Employee, EmployeeService} from "../../employee/employee.service";

@Component({
  selector: 'app-order-edit',
  templateUrl: './order-edit.component.html',
  styleUrls: ['./order-edit.component.css'],
})
export class OrderEditComponent implements OnInit {
  itemsForm: FormGroup;
  availableServices: Service[] = [];
  totalPrice: number = 0;
  clientDataForm: FormGroup;
  id: number | null = null;
  selectedStatus: string = 'NEW';  // Domyślnie ustawiamy na "Nowe"
  selectedEmployeeId: string | null = null;
  availableEmployees: Employee[] = [];
  private order: any;

  constructor(
    private fb: FormBuilder,
    private catalogService: CatalogService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.itemsForm = this.fb.group({
      items: this.fb.array([]),
    });

    this.clientDataForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
    });
  }

  get items() {
    return this.itemsForm.get('items') as FormArray;
  }

  ngOnInit(): void {
    console.log('Typy ID usług:', this.availableServices.map(s => typeof s.id));
    // Odczytaj orderId z parametrów URL
    const idParam = this.route.snapshot.paramMap.get('id');
    this.id = idParam ? +idParam : null; // Jeśli 'id' istnieje, przekształć je w liczbę, w przeciwnym razie ustaw null

    // Sprawdź, czy orderId jest zdefiniowane
    if (this.id !== null) {
      this.loadOrderData(); // Przykładowa funkcja do ładowania danych zlecenia
    } else {
      console.error('orderId is undefined');
    }

    // Pobierz dostępne usługi
    this.catalogService.getCatalogService().subscribe((services: Service[]) => {
      console.log('Otrzymane usługi:', services);
      this.availableServices = services.sort((a, b) => a.serviceName.localeCompare(b.serviceName));
      this.updateTotalPrice();
    });

    this.loadAvailableEmployees();
    // this.loadOrderData();
  }

  loadAvailableEmployees() {
    this.employeeService.getEmployees().subscribe((employees: Employee[]) => {
      console.log('Otrzymani pracownicy:', employees);
      console.log(this.availableEmployees);
      this.availableEmployees = employees;
    });
  }

  loadOrderData() {
    this.catalogService.getOrderById(this.id).subscribe((order) => {
      console.log('Otrzymane dane zlecenia:', order);
      // Wypełnij formularz klienta
      this.clientDataForm.setValue({
        email: order.client.email,
        name: order.client.name,
        phone: order.client.phone,
      });
      this.selectedStatus = order.status;
      // Wypełnij formularz usług
      order.items.forEach((item) => {
        this.addItem(item.id);
      });

      // this.selectedEmployeeId = this.order.employees.id;
      // Oblicz cenę całkowitą
      this.updateTotalPrice();


    });
  }

  addItem(serviceId: number) {
    const item = new FormControl(serviceId);
    this.items.push(item);
    this.updateTotalPrice();
  }

  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateTotalPrice();
  }

  addFirstAvailableService() {
    if (this.availableServices.length > 0) {
      const firstServiceId = this.availableServices[0].id;
      this.addItem(firstServiceId);
    }
  }

  updateTotalPrice() {
    // Oblicz sumę cen wybranych usług i części
    let totalPrice = 0;
    for (const control of this.items.controls) {
      const serviceId = +control.value; // Konwersja do liczby
      console.log('Service ID:', serviceId);
      const selectedService = this.availableServices.find(service => service.id === serviceId);
      if (selectedService) {
        console.log('Wybrana usługa:', selectedService);
        totalPrice += selectedService.price + selectedService.priceParts;
      }
    }
    // Aktualizuj totalPrice
    this.totalPrice = totalPrice;
    console.log('Całkowita cena:', totalPrice);
  }

  saveOrder() {
    if (this.clientDataForm.invalid || this.itemsForm.invalid) {
      return;
    }

    const selectedServices = this.itemsForm.value.items.map((item: number) => ({
      serviceId: item
    }));
    const clientData = this.clientDataForm.value;
    const selectedEmployee = this.availableEmployees.find(emp => this.selectedEmployeeId && emp.id === +this.selectedEmployeeId);


    const updatedOrderData = {
      items: selectedServices,
      client: {
        email: clientData.email,
        name: clientData.name,
        phone: clientData.phone,
      },
      employee: {
        name: selectedEmployee?.name,
        lastName: selectedEmployee?.lastName,
        position: selectedEmployee?.position
      }
    };


    this.catalogService.updateOrder(this.id, updatedOrderData).subscribe(
      (response) => {
        console.log('Zlecenie zostało zaktualizowane:', response);
        this.router.navigate(['order']);
      },
      (error) => {
        console.error('Błąd podczas aktualizacji zlecenia:', error);
      }
    );
  }

  assignEmployeeToOrder() {
    if (!this.selectedEmployeeId || !this.id) { // <- dodane sprawdzenie `!this.id`
      alert('Proszę wybrać pracownika!');
      return;
    }

    this.catalogService.assignEmployeeToOrder(this.id, this.selectedEmployeeId)
      .subscribe(
        (response) => {
          alert('Pracownik został przypisany do zlecenia!');
        },
        (error) => {
          alert('Wystąpił błąd podczas przypisywania pracownika.');
          console.error(error);
        }
      );
  }

  updateOrderStatus() {
    if (!this.id) {
      alert('Nie można zaktualizować statusu dla nieznanego ID zamówienia.');
      return;
    }

    this.catalogService.updateOrderStatus(this.id, this.selectedStatus).subscribe(
      response => {
        alert('Status zaktualizowany pomyślnie!');
      },
      error => {
        alert('Wystąpił błąd podczas aktualizacji statusu');
        console.error('Błąd:', error);
      }
    );
  }

  saveItems() {
    const itemsData = this.itemsForm.value.items.map((item: number) => ({
      serviceId: item
    }));

    if (this.id === null) {
      console.error('Order ID is null. Cannot update items.');
      return;
    }

    this.catalogService.updateOrderItems(this.id, itemsData).subscribe(
      (response) => {
        console.log('Items updated successfully', response);
      },
      (error) => {
        console.error('Error updating items', error);
      }
    );
  }

}
