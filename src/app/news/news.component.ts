import { query } from '@angular/animations';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit, AfterViewInit {

  allNews:any[];
  country="United-Arab-Emirates";
  countryCode ="ae";
  category="General";

  categories=[
    "General",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Sport",
    "Technology",
  ];

  countries:any[]=[
    {count:"United-Arab-Emirates",code:"ae"},{count:"Argentina",code:"ar"},{count:"Australia",code:"au"},{count:"Austria",code:"at"},
    {count:"Belgium",code:"be"},{count:"Brazil",code:"br"},{count:"Canada",code:"ca"},{count:"Switzerland",code:"ch"},
    {count:"China",code:"cn"},{count:"Czechia",code:"cz"},{count:"Germany",code:"de"},{count:"Egypt",code:"eg"},
    {count:"France",code:"fr"},{count:"United-Kingdom",code:"gb"},{count:"Greece",code:"gr"},{count:"Hong-Kong",code:"hk"},
    {count:"Hungary",code:"hu"},{count:"Indonesia",code:"id"},{count:"Israel",code:"il"},{count:"India",code:"in"},
    {count:"Italy",code:"it"},{count:"Japan",code:"jp"},{count:"Korea",code:"kr"},
    {count:"Lithuania",code:"lt"},{count:"Latvia",code:"lv"},{count:"Morocco",code:"ma"},{count:"Mexico",code:"mx"},
    {count:"Malaysia",code:"my"},{count:"Nigeria",code:"ng"},{count:"Netherlands",code:"nl"},{count:"Norway",code:"no"},
    {count:"New-Zealand",code:"nz"},{count:"Philippines",code:"ph"},{count:"Portugal",code:"pt"},{count:"Romania",code:"ro"},
    {count:"Russia",code:"ru"},{count:"Serbia",code:"rs"},{count:"Saudi-Arabia",code:"sa"},{count:"Sweden",code:"se"},
    {count:"Singapore",code:"sg"},{count:"Slovenia",code:"si"},{count:"Slovakia",code:"sk"},{count:"Thailand",code:"th"},
    {count:"Taiwan",code:"tw"},{count:"United-States-of-America",code:"us"},{count:"Venezuela",code:"ve"},{count:"South-Africa",code:"za"},
  ];

  constructor(private _NewsService:NewsService,private _Router:Router) {
    this.getNews();
  }

  ngOnInit():void {
  }
  
  ngAfterViewInit():void {
    let links = document.getElementsByClassName("nav-link");
    links[0].classList.add("active");
  }

  getNews():void{
    this._NewsService.getNews(this.category,this.country).subscribe(data => {this.allNews = data.articles});
    this._Router.navigate(['news',this.country,this.category]);
  }

  changeCunt(e:any):void{
    let links = document.getElementsByClassName("nav-link");
    this.country = this.countries[e.target.value].count;
    this._NewsService.getNews(this.category,this.countries[e.target.value].code).subscribe(data => {this.allNews = data.articles});
    this._Router.navigate(['news',this.countries[e.target.value].count,this.category]);
    for(let i = 0; i<this.categories.length; i++){
      if(this.categories[i] == this.category){
        links[i].classList.add("active");
        break;
      }
    }
  }

  changeCat(e:any):void{
    this.category=e.target.innerHTML;
    this._NewsService.getNews(this.category,this.country.substr(0,2)).subscribe(data => {this.allNews = data.articles;});
    this.removeAct();
    e.target.classList.add("active");
    this._Router.navigate(['news',this.country,this.category]);
  }

  search(e:any):void{
    let searchQuary=e.target.value;
    this.removeAct();
    console.log(searchQuary);
    if(searchQuary == ""){
      this._Router.navigate(['news','searching','empty-field'],{queryParams:{allow_searching:false}});
    }
    else{
      this._NewsService.searchNews(searchQuary).subscribe(data => {this.allNews = data.articles;});
      this._Router.navigate(['news','searching',searchQuary],{queryParams:{allow_searching:true}});
    }
  }

  removeAct():void
  {
    let links = document.getElementsByClassName("nav-link");
    for(let i = 0 ; i < links.length ; i++)
    {
      links[i].classList.remove("active");
    }
  }

}