import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  isConnected: boolean = false;
  nom!: string
  router:Router=inject(Router)
  ngOnInit(){
    if(localStorage.getItem('token')){
      this.isConnected=true;
      this.nom=localStorage.getItem('nom')!;
    }
  }
  deconnexion(){
    localStorage.clear();
    this.isConnected = false;
    this.router.navigate(['/'])
  }
}
