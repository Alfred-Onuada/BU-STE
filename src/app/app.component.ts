import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Observable, of } from 'rxjs';

@Component({
  selector: 'se-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'student-evaluation';

  profileName: any = '';
  isNotAdmin: Observable<boolean> = of(true)

  constructor(
    private router: Router
  ) { }

  // listen for navigation change, get the name from the localStorage and set it to the profileName
  ngOnInit(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => this.isNotAdmin = of(event.url != '/admin'))
  }
}
