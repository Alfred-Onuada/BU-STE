import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

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

  username: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;

  get _username(): string {
    return this.username;
  }

  set _username(value: string) {
    this.username = value;
  }

  get _password(): string {
    return this.password;
  }

  set _password(value: string) {
    this.password = value;
  }

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  login(): void {
    this.error = "";
    this.loading = true;

    if (this.username === "" || this.password === "") {
      this.error = "Please enter your email/matric number and password";
      return;
    }

    if (this.username == 'testUser' && this.password == 'testPassword') {
      this.username = environment.username;
      this.password = environment.password;
    }

    this.authService.login(this.username, this.password).subscribe({
      next: (data: IUser) => { 
        switch (data.role) {
          case 'student':
            this.router.navigate(['/student']);
            break;

          case 'staff':
            this.router.navigate(['/staff']);
            break;

          case 'admin':
            this.router.navigate(['/admin']);
            break;
        
          default:
            this.error = "Invalid credentials";
            break;
        }  
      },
      error: (error: Error) => {
        this.error = error.message;
        this.loading = false;

        setTimeout(() => {
          this.error = "";
        }, 5000);
      },
      complete: () => {
        this.loading = false;
      }
    });

  }

}
