import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/local-storage.service';

@Component({
  selector: 'logout-button',
  templateUrl: './logout.component.html'
})
export class LogoutComponent implements OnInit {

  localStorage = new LocalStorageService();

  constructor(private route: Router) { }

  ngOnInit() { }

  logout() {
    if (confirm('Você tem certeza de que quer sair?')) {
      this.localStorage.clear();
      this.route.navigate(['/home']);
    }
  }

}
