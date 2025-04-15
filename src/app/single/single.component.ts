import { Component, inject } from '@angular/core';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single',
  imports: [],
  templateUrl: './single.component.html',
  styleUrl: './single.component.css'
})
export class SingleComponent {
  route:ActivatedRoute = inject(ActivatedRoute)
  article!: Article|undefined;
  service : ArticleService = inject(ArticleService)
  articleId = -1

  ngOnInit(){
    this.articleId = Number(this.route.snapshot.paramMap.get('id')!)
    this.service.getOne(this.articleId).subscribe({
      next: (res : Article) => {
        this.article = res
      },
      error: (err) => {
        console.error('Erreur de récupération de l\'article :', err);
        alert('Erreur lors de la récupération de l\'article.');
      }
    })
  }
}
