import { Component, inject } from '@angular/core';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../models/article';
import { NgFor } from '@angular/common';
import { ArticleService } from '../services/article.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-article-list',
  imports: [ArticleComponent, NgFor, RouterLink],
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css'
})
export class ArticleListComponent {
  articles! : Article []
  service:ArticleService= inject (ArticleService)
  ngOnInit():void {
    this.articles = this.service.getAll()
      
    
  }
}
