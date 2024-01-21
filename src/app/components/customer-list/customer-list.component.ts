import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer/customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {
  token: any; 
  customers: any; 
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
}
