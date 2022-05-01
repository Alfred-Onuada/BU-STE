import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;

  profileName: string = "";
  
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void { 

    // listen on navigation and toggle isLoggedIn according to what is in localstorage

    this.router.events.subscribe(event => {
      if (localStorage.getItem('isLoggedIn') === 'true') {
        this.isLoggedIn = true;
        this.profileName = localStorage.getItem('email') || "";
      } else {
        this.isLoggedIn = false;
      }
    });
  }

  logout() : void {
    this.isLoggedIn = false;

    localStorage.setItem('isLoggedIn', 'false');
  }

}
