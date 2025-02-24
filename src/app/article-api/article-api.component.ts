import { Component, inject } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { ArticleComponent } from '../article/article.component';

@Component({
  selector: 'app-article-api',
  imports: [ArticleComponent, NgFor, RouterLink],
  templateUrl: './article-api.component.html',
  styleUrl: './article-api.component.css'
})
export class ArticleApiComponent {
  service: ArticleService = inject(ArticleService)
  articles!:Article[]
  ngOnInit(){
    this.service.all().then((articleApi:Article[])=>{
      this.service.articles=articleApi
      this.articles = this.service.articles
    })
  }

}
