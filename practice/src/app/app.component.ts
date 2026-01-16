import { Component } from '@angular/core';
import { NewsResponse } from './models/NewsResponse';
import { HttpClient } from '@angular/common/http';

const API_KEY = "d510d2e3544946238b7647a2f0239d1c"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoading = false
  title = ""
  newsResponse:NewsResponse = {
    status: '',
    totalResults: 0,
    articles: []
  }
  constructor(private httpClient:HttpClient){}
  fetchNews(){
    this.isLoading = true
    let news = this.httpClient.get<NewsResponse>(`https://newsapi.org/v2/top-headlines?language=en&apiKey=${API_KEY}`)
    news.subscribe((item)=>{
      this.newsResponse = item
      this.isLoading = false
    })
  }
}
