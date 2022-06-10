import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'se-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'student-evaluation';

  profileName: any = '';

  constructor(
    private router: Router
  ) { }

  // listen for navigation change, get the name from the localStorage and set it to the profileName
  
}
