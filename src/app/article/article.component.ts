import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { Article } from '../models/article';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticleService } from '../services/article.service';


@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() article! : Article
  @Output() deleted = new EventEmitter<number>();
  route : ActivatedRoute= inject(ActivatedRoute)
  router : Router = inject(Router)
  service: ArticleService = inject(ArticleService)

  delete(){

    if(confirm("voulez-vous supprimer cet article?")){
      this.service.destroyApi(this.article.id).subscribe({
        next: (res) => {
          //alert(res.message);
          // Rediriger ou recharger si besoin :
          this.deleted.emit(this.article.id);
          //this.router.navigate(['/articles-api']);
        },
        error: (err) => {
          console.error('Erreur de suppression :', err);
          alert('Erreur lors de la suppression.');
        }
      })
    }
  }
}
