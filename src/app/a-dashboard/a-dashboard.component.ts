import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';

@Component({
  selector: 'se-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements OnInit {
  
  constructor() {}

  sidenavIsOpen: boolean = true;
  canClose: boolean = false;
  navStyle: MatDrawerMode = 'side';

  ngOnInit(): void {
    
  }
  
}
