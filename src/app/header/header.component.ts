import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isConnected = signal<boolean>(false);
  nom = signal<string>('');
  router:Router=inject(Router)
  constructor( public auth: AuthService){}
  // Vérifie si l'on est sur la page des articles

  isArticlesPage(): boolean {
    return this.router.url === '/articles-api';
  }
  
  deconnexion(){
    this.auth.logout()
    this.router.navigate(['/'])
  }
}
