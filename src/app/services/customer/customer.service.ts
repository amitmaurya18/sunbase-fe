import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  apiUrl: string = 'http://localhost:9090'; 
  constructor(private http: HttpClient) { }

  getCustomers(token: string): Observable<any> {

    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the GET request
    return this.http.get<any>(`${this.apiUrl}/customers`, { headers });
  }
  getCustomer(token: string, customerId: string): Observable<any> {

    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the GET request
    return this.http.get<any>(`${this.apiUrl}/customers/${customerId}`, { headers });
  }


  addCustomer(token: string, newCustomer: any): Observable<any> {
    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the POST request
    return this.http.post<any>(`${this.apiUrl}/customers`, newCustomer, { headers });
  }

  editCustomer(token: string, customerId: string, updatedCustomer: any): Observable<any> {
    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the PUT request
    return this.http.put<any>(`${this.apiUrl}/customers/${customerId}`, updatedCustomer, { headers });
  }

  deleteCustomer(token: string, customerId: string): Observable<any> {
    // Create headers with Authorization
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });

    // Make the DELETE request
    return this.http.delete<any>(`${this.apiUrl}/customers/${customerId}`, { headers });
  }

}
