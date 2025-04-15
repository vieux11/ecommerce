import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
isConnected = signal<boolean>(false);
nom = signal<string>('');
  constructor() {
    const token= localStorage.getItem('token');
    const name = localStorage.getItem('nom');
    if (token) {
      this.isConnected.set(true);
      this.nom.set(name || '');
    }
   }
   loginSuccess(token: string, nom: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('nom', nom);
    this.isConnected.set(true);
    this.nom.set(nom);
  }
  logout() {
    localStorage.clear();
    this.isConnected.set(false);
    this.nom.set('');
  }
}
