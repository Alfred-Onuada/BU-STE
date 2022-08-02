import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faBars, faClose, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { SharedNavService } from '../services/nav.service';

@Component({
  selector: 'se-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = false;
  isMobile: boolean = window.innerWidth < 768 ? true : false;
  isAdminPage: Observable<boolean> = of(false);

  navIsClosed: boolean = true;

  // logout icon from font awesome
  logoutIcon = faSignOutAlt;
  hamburgerIcon = faBars;
  closeIcon = faClose;
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private navService: SharedNavService
  ) { }

  ngOnInit(): void { 

    // listen on navigation and toggle isLoggedIn according to what is in localstorage
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isLoggedIn = this.authService.isLoggedIn();
        this.isAdminPage = of(event.url == '/admin')
      }
    });

    this.navService.getState().subscribe(state => this.navIsClosed = state);
  }

  showNav(): void {
    this.navIsClosed = !this.navIsClosed;

    this.navService.setState(this.navIsClosed);
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
