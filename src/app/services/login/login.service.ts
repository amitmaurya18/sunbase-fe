import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


  apiUrl: string = 'http://localhost:9090/auth/login'

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    const credentials = { email, password };  // Adjusted to match your API's expected format
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post<any>(`${this.apiUrl}`, credentials, httpOptions);
  }
}
