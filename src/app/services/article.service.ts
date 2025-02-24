import { Injectable } from '@angular/core';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
   baseUrl: string = 'http://localhost:3333'

  //constructor() { }
  articles:Article [] = []

  getAll() : Article[]{
    return this.articles;
  }
  getOne(id : number) : Article | undefined{
    return this.articles.find(article => article.id === id);
  }
  store(title:string,category:string,price:number, image:string, description:string, rate: number, count: number ){
    const article : Article = {
      id: this.articles.length+1,
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rate : rate,
      count : count
      }
    this.articles.unshift(article);
  }
  update(id:number,title:string,category:string,price:number, image:string, description:string, rate: number, count: number ){
    let index= this.articles.findIndex(article => article.id == id);
    this.articles[index].title = title;
    this.articles[index].price = price;
    this.articles[index].description = description;
    this.articles[index].category = category;
    this.articles[index].image = image;
    this.articles[index].rate = rate;
    this.articles[index].count = count;
  }
  async all():Promise<Article[]>{
    let rep = await fetch(`${this.baseUrl}/articles`, {
      method: 'GET',
      headers:{"authorisation":"Bearer"+localStorage.getItem('token')}
    }).then(res => res.json());
    return rep;
  }
  async storeApi(title:string,category:string,price:number, image:string, description:string, rate: number, count: number ):Promise<Article> {
    const article={
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      count: count,
      rate:rate
    }
    let rep= await fetch(`${this.baseUrl}/articles`,{
      method: 'POST',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
    return rep;
    console.log(rep);
  }
  async updateApi(id:number,title:string,category:string, price:number, image:string, description:string, rate: number, count: number):Promise<Article> {

  const index = this.articles.findIndex(article => article.id == id);
    const article={
      title: title,
      price: price,
      description: description,
      category: category,
      image: image,
      rate: rate,
      count: count
    }
    let rep= await fetch(`${this.baseUrl}/articles/${id}`,{
      method: 'PUT',
      body: JSON.stringify(article),
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
    return rep;
  }
  async destroyApi(id:number):Promise<{id:number, message:string}> {
    let rep= await fetch(`${this.baseUrl}/articles/${id}`,{
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
    .then(res => res.json());
    return rep;
  }
}
