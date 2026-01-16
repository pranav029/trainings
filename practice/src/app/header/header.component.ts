import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Article } from '../models/NewsResponse';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 @Input()
  article!: Article;
}
