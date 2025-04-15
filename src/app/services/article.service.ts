import { inject, Injectable } from '@angular/core';
import { Article } from '../models/article';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
   baseUrl: string = 'http://localhost:3333'
   articles!: Article[];
   constructor(private http: HttpClient) {}
  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(`${this.baseUrl}/articles`, {
        headers:{
           'Content-Type': 'application/json; charset=UTF-8',
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      }
    );
  }
  saveArticle(title:string,category:string,price:number, image:string, description:string, rate: number, count: number ): Observable<Article> {
    const article={
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      count: count,
      rate:rate
    }
    return this.http.post<Article>(`${this.baseUrl}/articles`, article, {
        headers:{
          'Content-Type': 'application/json; charset=UTF-8',
          'Authorization':'Bearer '+localStorage.getItem('token')
        }
      }
    );
  }
  getOne(id : number) : Observable<Article> {
    return this.http.get<Article>(`${this.baseUrl}/articles/${id}`,  {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
  })
}

updateApi(
  id: number,
  title: string,
  category: string,
  price: number,
  image: string,
  description: string,
  rate: number,
  count: number
): Observable<Article> {
  const updatedArticle = {
    title,
    price,
    description,
    category,
    image,
    rate,
    count
  };

  return this.http.put<Article>(`${this.baseUrl}/articles/${id}`, updatedArticle, {
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
      'Authorization': 'Bearer ' + localStorage.getItem('token') // optionnel si tu protèges l'API
    }
  });
}

  destroyApi(id:number): Observable<{message:string}> {
    return this.http.delete <{message:string}>(`${this.baseUrl}/articles/${id}`,{
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        'Authorization':'Bearer '+localStorage.getItem('token')
      }
    })
  }
}
