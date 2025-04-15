import { NgIf } from '@angular/common';
import { Component, EventEmitter, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User, UserLogin } from '../models/user';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  imports: [NgIf,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  user!: UserLogin

  service:UserService=inject(UserService)
  auth:AuthService=inject(AuthService)
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
    .subscribe((response:UserLogin) => {
      console.log(response)
      this.user=response;
      if(response.token) {
        this.auth.loginSuccess(response.token.token, response.user.fullName);
        this.router.navigate(['/articles-api']);
      }
      else{
        this.submitted = true;
      }
    })
    //.then(() => location.reload())
    
  }
  close(){
    this.submitted=false
  }
}
