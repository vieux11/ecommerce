import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-register',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  service:UserService=inject(UserService)
  user!:User
  submitted: boolean = false;
    registerForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
    save(){
        this.service.register(
          this.registerForm.value.fullName??"",
          this.registerForm.value.email??"",
          this.registerForm.value.password??"",
        ).subscribe()
        this.submitted = true
      this.registerForm = new FormGroup({
      fullName: new FormControl(''),
      email: new FormControl(''),
      password: new FormControl(''),
    });
  }      
}
