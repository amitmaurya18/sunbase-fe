import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LoginService } from '../../services/login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private loginService: LoginService, private router: Router){

  }
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })


  onSubmit() {

    const emailValue:any = this.loginForm.controls['email'].value;
    const passwordValue: any = this.loginForm.controls['password'].value;
    this.loginService.login(emailValue, passwordValue).subscribe(
      response => {
        // Handle successful login response
        console.log(response);
        // storing the token in local storage
        localStorage.setItem('token', response.jwtToken); 
        // navigate to customer list
        this.router.navigate(['/customer-list']);
      },
      error => {
        // Handle login error
        console.error(error);
      }
    );
  }

}
