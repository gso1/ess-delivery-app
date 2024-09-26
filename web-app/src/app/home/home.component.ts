import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private route: Router, private serviceTitle: Title) {}

  localStorage = new LocalStorageService();
  
  ngOnInit() {
    this.serviceTitle.setTitle('Home')
  }
  
  navigateLogin(type:string): void{
    this.localStorage.set('type', type);
    this.route.navigate(["login", type]);
  }

}

