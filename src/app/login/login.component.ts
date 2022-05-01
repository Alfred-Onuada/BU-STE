import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'se-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('errorAnimation', [
      state('animate', style({
        display: 'block',
      })),
      state('nothing', style({
        display: 'none',
      })),
      transition('animate => nothing', [
        animate('.01s', style({
          display: 'none',
        }))
      ]),
      transition('nothing => animate', [
        animate('.5s', keyframes([
          style({ display: 'block' }),
          style({ transform: "translate3d(-2px, 0, 0)" }),
          style({ transform: "translate3d(4px, 0, 0)" }),
          style({ transform: "translate3d(-6px, 0, 0)" }),
          style({ transform: "translate3d(6px, 0, 0)" }),
          style({ transform: "translate3d(-6px, 0, 0)" }),
          style({ transform: "translate3d(6px, 0, 0)" }),
          style({ transform: "translate3d(-6px, 0, 0)" }),
          style({ transform: "translate3d(4px, 0, 0)" }),
          style({ transform: "translate3d(-2px, 0, 0)" })
        ]))
      ])
    ])
  ]
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  formIsDisabled: string = 'true';
  error: string = '';

  get _email(): string {
    return this.email;
  }

  set _email(value: string) {
    this.email = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  formValueChanged(): void {
    if (this.email && this.password) {
      this.formIsDisabled = 'false';
    } else {
      this.formIsDisabled = 'true';
    }
  }

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.error = "";

    localStorage.setItem('isLoggedIn', 'true');

    if (this.email === 'admin@bu.com') {
      localStorage.setItem('email', this.email);
      this.router.navigate(['/admin']);
    } else if (this.email === 'staff@bu.com') {
      localStorage.setItem('email', this.email);
      this.router.navigate(['/staff']);
    } else if (this.email === 'student@bu.com') {
      localStorage.setItem('email', this.email);
      this.router.navigate(['/student']);
    } else {
      this.error = "Invalid email or password";

      let timeOut = setTimeout(() => {
        this.error = ''
        clearTimeout(timeOut);
      }, 5000);
    }
  }

}
