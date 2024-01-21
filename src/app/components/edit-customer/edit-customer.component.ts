import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../services/customer/customer.service';

@Component({
  selector: 'app-edit-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-customer.component.html',
  styleUrl: './edit-customer.component.scss'
})
export class EditCustomerComponent implements OnInit{
  token: any; 
  customerId: any; 
  customer: any; 
  constructor(private router: Router, private customerService: CustomerService, private route: ActivatedRoute){}
  ngOnInit(): void {
    this.getToken();
    this.getCustomerId();
    this.getCustomer(); 
  }

  editCustomerForm = new FormGroup({
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

  getCustomerId(){
    this.route.paramMap.subscribe(params => {
      this.customerId = params.get('customerId');
      console.log(this.customerId);
    });
  }

  getCustomer(){
    this.customerService.getCustomer(this.token, this.customerId).subscribe(
      response => {
        // Handle successful login response
        console.log(response);
        this.customer = response; 
        this.setFormValues(); 
      },
      error => {
        // Handle login error
        console.error(error);
      }
    );
  }

  navigateToCustomerList(){
    this.router.navigate(['/customer-list'])
  }

  saveCustomer(){
    this.customerService.editCustomer(this.token, this.customerId, this.editCustomerForm.value).subscribe(
      response => {
        // Handle successful login response
        console.log(response);
        this.navigateToCustomerList();
      },
      error => {
        // Handle login error
        console.error(error);
      }
    );
  }

  setFormValues(){
    this.editCustomerForm.controls.firstName.setValue(this.customer.firstName);
    this.editCustomerForm.controls.lastName.setValue(this.customer.lastName);
    this.editCustomerForm.controls.street.setValue(this.customer.street);
    this.editCustomerForm.controls.address.setValue(this.customer.address);
    this.editCustomerForm.controls.city.setValue(this.customer.city);
    this.editCustomerForm.controls.state.setValue(this.customer.state);
    this.editCustomerForm.controls.email.setValue(this.customer.email);
    this.editCustomerForm.controls.phone.setValue(this.customer.phone);
  }
}
