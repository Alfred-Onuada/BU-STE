import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../services/auth.service';

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
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void { 

    // listen on navigation and toggle isLoggedIn according to what is in localstorage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
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
    this.authService.logout();
    this.router.navigate(['/login']);

    this.isLoggedIn = false;
  }

}
