import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { IQuestion } from '../interfaces/question';
import { AuthService } from './auth.service';

interface sections {
  id: number,
  title: string,
  rate_min: number,
  rate_max: number,
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  private sectionsUrl = 'https://streapi.babcock.edu.ng/api/sections';

  private questionsSub$!: Subscription;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  getSections(): Observable<sections[]> {
    let token = this.authService.getToken();

    return this.http.get<sections[]>(
      this.sectionsUrl,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    ).pipe(
      map((sections: sections[]) => {
        sections.map((section) => {
          section.completed = false;
        })
        
        return sections
      }),
      catchError(this.handleError)
    )
  }

  getQuestionsForSection(sectionId: number): Observable<IQuestion[]> {
    let token = this.authService.getToken();

    return this.http.get<IQuestion[]>(
      `https://streapi.babcock.edu.ng/api/section/${sectionId}/questions`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      }
    ).pipe(
      map((questions: IQuestion[]) => {

        questions.map((question: IQuestion) => {
          question.score = 0;
        })

        return questions;
      }),
      catchError(this.handleError)
    )
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
