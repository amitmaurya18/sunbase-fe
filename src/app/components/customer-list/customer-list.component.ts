import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [NgbModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  token: any; 
  customers: any; 
  originalCustomers: any;
  constructor(private customerService: CustomerService, private router: Router){

  }
  ngOnInit() {
    this.getToken(); 
    this.getCustomers(); 
  }

  getToken(){
    if(localStorage.getItem('token')!=null){
      this.token = localStorage.getItem('token'); 
    }
    }
    getCustomers(){
      this.customerService.getCustomers(this.token).subscribe(
        response => {
          // Handle successful login response
          console.log(response);
          this.customers = response; 
        },
        error => {
          // Handle login error
          console.error(error);
        }
      );
    }
    navigateToAddCustomer(){
      this.router.navigate(['/add-customer']);
    }

    navigateToEditCustomer(customerId: string){
      this.router.navigate(['/edit-customer', customerId]);
    }

    deleteCustomer(customerId: string){
      this.customerService.deleteCustomer(this.token, customerId).subscribe(
        response => {
          // Handle successful login response
          console.log(response);
          this.getCustomers();
        },
        error => {
          // Handle login error
          console.error(error);
        }
      );
    }

    private customerMatchesSearch(customer: any, searchText: string): boolean {
      // Customize this method based on your search criteria
      const searchFields = ['firstName', 'lastName', 'street', 'address', 'city', 'state', 'email', 'phone'];
      
      return searchFields.some(field =>
        customer[field].toLowerCase().includes(searchText.toLowerCase())
      );
    }

    onSearchChange(event: any) {
      // Filter the data based on the searchText
      const searchText = event.target ? event.target.value : '';

      if (!this.originalCustomers) {
        this.originalCustomers = [...this.customers];
      }
    
      if (searchText.trim() === '') {
        // If search text is empty, reset to the original data
        this.customers = [...this.originalCustomers];
      } else {
        // Otherwise, filter the data based on the searchText
        this.customers = this.originalCustomers.filter((customer: any) =>
          this.customerMatchesSearch(customer, searchText)
        );
      }

      this.customers = this.customers.filter((customer: any) =>
        this.customerMatchesSearch(customer, searchText)
      );
    }
}
