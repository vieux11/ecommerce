import { Component, inject } from '@angular/core';
import { ArticleService } from '../services/article.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { count } from 'rxjs';
import { NgIf } from '@angular/common';
import { Article } from '../models/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create',
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css'
})
export class CreateComponent {
  router: Router = inject(Router)
  service: ArticleService = inject(ArticleService)
  article?: Article
  isOpen: boolean = false

  enregistrer(){
    this.service.saveArticle(this.applyForm.value.title??"",
      this.applyForm.value.category??"",
      this.applyForm.value.price??0,
      this.applyForm.value.image??"",
      this.applyForm.value.description??"",
      this.applyForm.value.rate??0,
      this.applyForm.value.count??0).subscribe(rep=>{
        this.article = rep
        console.log(this.article)
        this.isOpen = true
      })
  }

  applyForm= new FormGroup({
    title: new FormControl(''),
    category: new FormControl(''),
    price: new FormControl(0),
    description: new FormControl(''),
    image: new FormControl(''),
    rate: new FormControl(0),
    count: new FormControl(0)
  })
 
  close(){
    this.isOpen=false
    this.router.navigate(['/articles-api'])
  }

}
