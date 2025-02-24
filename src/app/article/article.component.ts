import { Component, inject, Input } from '@angular/core';
import { Article } from '../models/article';
import { RouterLink } from '@angular/router';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article',
  imports: [RouterLink],
  templateUrl: './article.component.html',
  styleUrl: './article.component.css'
})
export class ArticleComponent {
  @Input() article! : Article
  service: ArticleService = inject(ArticleService)

  delete(id:number){
    if(confirm("voulez-vous supprimer cet article?")){
      this.service.destroyApi(id).then((articleApi)=>{ 
        const index = this.service.articles.findIndex( article=> article.id == id)
        this.service.articles.splice(index, 1)
        alert(articleApi.message)
      })
    }
  }
}
