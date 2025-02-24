import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: User[];
  baseUrl: string = 'http://localhost:3333'

  //constructor() { }
  
  async register(fullName:string, email: string, password: string):Promise<User> {
    const user: User = {
      fullName: fullName,
      email: email,
      password: password
    }
    let rep= await fetch(`${this.baseUrl}/users`,{
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
    return rep;
  }
  async login(email: string, password: string): Promise<UserLogin> {
    const credentials = { email, password };
  
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(credentials)
    });
  
    // On convertit la réponse en JSON
    const data = await response.json();
  
    // data devrait être de la forme :
    // {
    //   "user": { ... },
    //   "token": { "type": "bearer", "token": "oat_...", ... }
    // }
    return data;
  }
  
}
