import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'se-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean = true;

  profileName: string = "Onuada Alfred";
  
  constructor() { }

  ngOnInit(): void {
  }

  toggleLoginState() : void {
    this.isLoggedIn = !this.isLoggedIn;
  }

}
