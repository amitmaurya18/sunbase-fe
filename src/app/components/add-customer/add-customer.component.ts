import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-add-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-customer.component.html',
  styleUrl: './add-customer.component.scss'
})
export class AddCustomerComponent implements OnInit{
  token: any; 
  constructor(private router: Router, private customerService: CustomerService){}
  ngOnInit(): void {
    this.getToken();
  }

  addCustomerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    street: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl('')
  })

  getToken(){
    if(localStorage.getItem('token')!=null)
    this.token = localStorage.getItem('token');
  }

  navigateToCustomerList(){
    this.router.navigate(['/customer-list'])
  }
  saveCustomer(){
    this.customerService.addCustomer(this.token, this.addCustomerForm.value).subscribe(
      response => {
        // Response from add customer api
        console.log(response);
        this.navigateToCustomerList(); 
      },
      error => {
        // Handle save error
        console.error(error);
      }
    );
  }
}
