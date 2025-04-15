import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../services/article.service';
import { Article } from '../models/article';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-edit',
  imports: [NgIf, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent {
  route:ActivatedRoute= inject(ActivatedRoute)
  router: Router= inject(Router)
  service:ArticleService=inject(ArticleService)
  isOpen:boolean=false
  articleId:number = -1
  article!:Article | undefined

  applyForm = new FormGroup({
        title: new FormControl(''),
        category: new FormControl(''),
        price: new FormControl(0),
        description: new FormControl(''),
        image: new FormControl(''),
        rate: new FormControl(0),
        count: new FormControl(0)
  })
  ngOnInit(){
    this.articleId=Number(this.route.snapshot.paramMap.get('id'))
    this.service.getOne(this.articleId).subscribe({
      next: (article: Article) => {
        this.applyForm.patchValue({
          title: article.title,
          category: article.category,
          price: article.price,
          image: article.image,
          description: article.description,
          rate: article.rate,
          count: article.count
        });
      },
      error: (err) => {
        console.error('Erreur récupération article :', err);
        alert('Impossible de charger l’article.');
      }
    });
    }
    
    
  edit() {
    this.service.updateApi(
      this.articleId,
      this.applyForm.value.title ?? "",
      this.applyForm.value.category ?? "",
      this.applyForm.value.price ?? 0,
      this.applyForm.value.image ?? "",
      this.applyForm.value.description ?? "",
      this.applyForm.value.rate ?? 0,
      this.applyForm.value.count ?? 0
    ).subscribe({
      next: (articleApi: Article) => {
      console.log('Article mis à jour avec succès :', articleApi);
  
        // 👉 Optionnel : afficher un toast, rediriger, etc.
        this.isOpen=true
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de l\'article', err);
      }
    });
    
  }
    
  close(){
    this.isOpen=false
    this.router.navigate(['/articles-api'])
  }
}
