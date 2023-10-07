import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {

  router = inject(Router)
  constructor() { }

  ngOnInit() {
  }
 
  ionViewWillEnter() {
    setTimeout(() => {
      this.router.navigateByUrl('/login')
    }, 3000);
  }

}
