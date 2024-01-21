import { Routes } from '@angular/router';
import { CustomerListComponent } from './components/customer-list/customer-list.component';
import { LoginComponent } from './components/login/login.component';
import { AddCustomerComponent } from './components/add-customer/add-customer.component';
import { EditCustomerComponent } from './components/edit-customer/edit-customer.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' }, 
    { path: 'login', component: LoginComponent },
    { path: 'customer-list', component: CustomerListComponent },
    { path: 'add-customer', component: AddCustomerComponent },
    { path: 'edit-customer/:customerId', component: EditCustomerComponent },
];
