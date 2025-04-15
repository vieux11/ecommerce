import { Component, inject } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-article-api',
  imports: [ArticleComponent, NgFor, RouterLink, NgIf, FormsModule],
  templateUrl: './article-api.component.html',
  styleUrl: './article-api.component.css'
})
export class ArticleApiComponent {
  service: ArticleService = inject(ArticleService)
  articles!:Article[]
  filteredArticles: Article[] = [];

  searchTerm: string = '';

  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  ngOnInit(){
    this.service.getArticles().subscribe((all)=>{
      this.articles=all
      this.filteredArticles = all;
    })
  }
  onArticleDeleted(id: number) {
    this.articles = this.articles.filter(a => a.id !== id);
    this.filteredArticles = this.filteredArticles.filter(a => a.id !== id);
    this.showCustomToast('Article supprimé avec succès', 'success');
  }
  showCustomToast(message: string, type: 'success' | 'error' = 'success') {
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;

    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  }
  filterArticles() {
    const term = this.searchTerm.toLowerCase();
    this.filteredArticles = this.articles.filter(article =>
      article.title.toLowerCase().includes(term) ||
      article.category.toLowerCase().includes(term)
    );
  }
}
