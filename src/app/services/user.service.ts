import { Injectable } from '@angular/core';
import { User, UserLogin } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users!: User[];
  baseUrl: string = 'http://localhost:3333'

  //constructor() { }
  constructor(private http: HttpClient) {}
  register(fullName:string, email: string, password: string): Observable<User> {
    const user: User = {
      fullName: fullName,
      email: email,
      password: password
    }
    return this.http.post<User>(`${this.baseUrl}/users`, user,{
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    });
  }
  login(email: string, password: string): Observable <UserLogin> {
    const credentials = { email, password };
    console.log('Données envoyées:', credentials);
  
    return this.http.post<UserLogin>(`${this.baseUrl}/login`, credentials, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
    });

  }
  
}
