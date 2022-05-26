import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'se-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;
  isMobile: boolean = window.innerWidth < 768 ? true : false;

  // logout icon from font awesome
  logoutIcon = faSignOutAlt;

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

  checkIfMobile(): void {
    if (window.innerWidth < 768) {
      this.isMobile = true;
    } else {
      this.isMobile = false;
    }
  }

  logout() : void {
    this.isLoggedIn = false;

    localStorage.setItem('isLoggedIn', 'false');
  }

}
