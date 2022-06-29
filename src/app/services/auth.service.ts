import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, map, Observable, of, throwError } from "rxjs";
import { IUser } from "../interfaces/user";

interface ILoginResponse{
  role: string,
  username: string,
  token: string
}

@Injectable({
  providedIn: "root"
})
export class AuthService {

  loginUrl: string = "https://streapi.babcock.edu.ng/api/login";

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<IUser> {
    return this.http.post<ILoginResponse>(
      // url
      this.loginUrl,
      // body
      { username, password },
      // options
      {
        headers: { 
          "Content-Type": "application/json",
        }
      }
    )
    .pipe(
      map((response: ILoginResponse): IUser => {
        // store the token
        this.setToken(response.token, response.role);

        return {
          name: response.username,
          role: response.role
        };          
      }),
      catchError(this.handleError)
    )
  }

  hasValidToken(role: string): boolean {
    if (this.getToken() == '') {
      return false;
    }

    // roles mismatch
    if (this.getRole() != btoa(role)) {
      return false
    }

    return true;
  }

  isLoggedIn(): boolean {
    return this.getToken() != '';
  }

  getToken(): string {
    return localStorage.getItem("token")?.split('.')[0] || '';
  }

  getRole(): string {
    return localStorage.getItem('token')?.split('.')[1] || '';
  }

  setToken(token: string, role: string): void {
    let encodedToken = token + "." + btoa(role)
    localStorage.setItem("token", encodedToken);
  }

  logout(): void {
    // clear local storage
    localStorage.clear();
  }

  handleError(error: HttpErrorResponse): Observable<never> {

    let errorMsg = "";

    if (error.status === 500) {
      errorMsg = "Somthing went wrong on our end, please try again later";
    } else {
      errorMsg = error.error.error;

    }

    return throwError(() => new Error(errorMsg))
  }
}