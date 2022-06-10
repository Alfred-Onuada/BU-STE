import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { IUser } from "../interfaces/user";
import jwt_decode, { InvalidTokenError, JwtPayload } from 'jwt-decode';

@Injectable({
  providedIn: "root"
})
export class AuthService {

  loginUrl: string = "https://streapi.babcock.edu.ng/api/auth/user_login";
  private readonly devAccessToken: string = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvc3RyZWFwaS5iYWJjb2NrLmVkdS5uZ1wvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NDc4MDkyMywiZXhwIjoxNjU0Nzg0NTIzLCJuYmYiOjE2NTQ3ODA5MjMsImp0aSI6Im9hek5POVR6ZDcxbzNUc3kiLCJzdWIiOjUsInBydiI6IjBiZjZjNzFmN2MzOWI4MWEyYzFiNzUxNjBjOWRhMmU1N2MyZmVkNjYifQ.1J2zW27VdgZD3G0Yhoqet_TtZ34-x0tQWUSz6yC3p-Q";

  constructor(
    private http: HttpClient
  ) { }

  private getDevAccessToken(): string {
    return this.devAccessToken;
  }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<string>(
      // url
      this.loginUrl,
      // body
      { username, password },
      // options
      {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${this.getDevAccessToken()}`
        }
      }
    )
    .pipe(
      map((jwt: string): IUser => {
        try {
          const payload: JwtPayload = jwt_decode(jwt);

          // store the token
          this.setToken(jwt);

          return {
            name: "",
            role: ""
          };          
        } catch (error) {
          console.log(error);
          return { name: "", role: "" };
          // this.handleError(error)
        }
      }),
      catchError(this.handleError)
    )
  }

  getCurrentUser(): IUser {
    const token: string = this.getToken();

    if (!token) return { name: "", role: "" };

    try {
      const payload: JwtPayload = jwt_decode(token);

      return {
        name: "",
        role: ""
      };
    } catch (error) {
      return { name: "", role: "" };
    }
  }

  validateAccessViaToken(route: string): boolean {
    if (!this.hasValidToken()) return false;

    const user: IUser = this.getCurrentUser();

    // accessing an unauthorized route
    if (user.role != route) {
      return false;
    }

    return true
  }

  hasValidToken(): boolean {
    const token: string = this.getToken();

    // no token present
    if (!token) return false;

    try {
      const payload: any = jwt_decode(token);

      const expiryDate: Date = new Date(payload.exp * 1000);
      const currentDate: Date = new Date();

      // expired token
      if (currentDate > expiryDate) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }

  }

  isLoggedIn(): boolean {
    return this.hasValidToken();
  }

  getToken(): string {
    return localStorage.getItem("token") || '';
  }

  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  logout(): void {
    // clear local storage
    localStorage.clear();
  }

  handleError(error: HttpErrorResponse | InvalidTokenError): Observable<never> {
    // do what so ever you want with the error
    if (error instanceof InvalidTokenError) {
      return throwError(() => new Error(error.message));
    }

    return throwError(() => new Error(error.error.error))
  }
}