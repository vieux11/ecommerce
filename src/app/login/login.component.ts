import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User, UserLogin } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user!: UserLogin
  service:UserService=inject(UserService)
  submitted: boolean = false;
  router:Router=inject(Router)
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });
  connexion() {
    this.service.login(
      this.loginForm.value.email ?? "",
      this.loginForm.value.password ?? ""
    )
    .then((response:UserLogin) => {
      this.user=response;
      if(response.token) {
        localStorage.setItem('token', response.token.token)
        localStorage.setItem('nom', response.user.fullName)
        localStorage.setItem('email', response.user.email)
        this.router.navigate(['/articles-api']);
      }
      else{
        this.submitted = true;
      }
    }).then(() => location.reload())
    
  }
  close(){
    this.submitted=false
  }
}
