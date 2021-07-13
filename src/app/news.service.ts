import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
 
  constructor(private _HttpClient:HttpClient) { }

  getNews(newCat:string,cunt:string):Observable<any>{
    return this._HttpClient.get(`http://newsapi.org/v2/top-headlines?country=${cunt}&category=${newCat}&apiKey=7ad0212514724cb29a48d475b0f1ce71`);
  }

  searchNews(searchWord:string):Observable<any>{
    // return this._HttpClient.get(`https://newsapi.org/v2/everything?q=${searchWord}&from=2021-06-13&sortBy=publishedAt&apiKey=7ad0212514724cb29a48d475b0f1ce71`);
    return this._HttpClient.get(`https://newsapi.org/v2/everything?q=${searchWord}&apiKey=7ad0212514724cb29a48d475b0f1ce71`);
  }

}
