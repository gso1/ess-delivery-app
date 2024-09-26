import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'src/app/local-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bar',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.css']
})
export class BarComponent implements OnInit {


  constructor(private route: Router) { }

  data: any;
  localStorage = new LocalStorageService();
  type: string;

  goToHome() {
    if (confirm('Você tem certeza de que quer sair?')) {
      this.route.navigate(["/home"]);
    }
  }

  // to enable this functionality, the best thing would be to make different types of profiles, so we can know beforehand which route to go. This is not a main priority, so it should be implemented only if we are given more time.
  // goToProfile(user_id: string) {
  //   this.route.navigate(["user", user_id, "profile"]);
  // }



  ngOnInit() {
    this.type = this.localStorage.get('type');
    this.data = this.localStorage.get(this.type);
  }

}
