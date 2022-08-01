import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, Subscription, throwError } from 'rxjs';
import { IQuestion } from '../interfaces/question';
import { ISections } from '../interfaces/sections';
import { AuthService } from './auth.service';

interface sections {
  id: number;
  title: string;
  rate_min: number;
  rate_max: number;
  completed: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class QuestionsService {
  private sectionsUrl = 'https://streapi.babcock.edu.ng/api/sections';

  private questionsSub$!: Subscription;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getSections(): Observable<sections[]> {
    let token = this.authService.getToken();

    return this.http
      .get<sections[]>(this.sectionsUrl, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(
        map((sections: sections[]) => {
          sections.map((section) => {
            section.completed = false;
          });

          return sections;
        }),
        catchError(this.handleError)
      );
  }

  getQuestionsForSection(sectionId: number): Observable<IQuestion[]> {
    let token = this.authService.getToken();

    return this.http
      .get<IQuestion[]>(
        `https://streapi.babcock.edu.ng/api/section/${sectionId}/questions`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .pipe(
        map((questions: IQuestion[]) => {
          questions.map((question: IQuestion) => {
            question.score = 0;
          });

          return questions;
        }),
        catchError(this.handleError)
      );
  }

  mockSections(): ISections[] {
    return [
      {
        id: 1,
        title: 'Teaching methodology',
        rate_min: 1,
        rate_max: 5,
        completed: false,
      },
      {
        id: 2,
        completed: false,
        title: 'Assessment procedures',
        rate_min: 1,
        rate_max: 5,
      },
      {
        id: 3,
        completed: false,
        title: 'Integration of faith/christian concepts/values in teaching',
        rate_min: 1,
        rate_max: 5,
      },
      {
        id: 4,
        completed: false,
        title: 'Classroom management',
        rate_min: 1,
        rate_max: 5,
      },
      {
        id: 5,
        completed: false,
        title: 'Teachers attendance and punctuality',
        rate_min: 1,
        rate_max: 5,
      },
      {
        id: 6,
        completed: false,
        title: 'Just Testing',
        rate_min: 1,
        rate_max: 4,
      },
    ];
  }

  mockQuestions(): IQuestion[][] {
    return [
      [
        {
          id: 7,
          title: 'Adequacy of tutorial hours and method',
          section_id: 1,
          score: 0,
        },
        {
          id: 5,
          title: "Clarity of teacher's explanation",
          section_id: 1,
          score: 0,
        },
        {
          id: 1,
          title: "Clarity of teacher's presentations",
          section_id: 1,
          score: 0,
        },
        {
          id: 3,
          title:
            'Clarity of the syllabus in stating course objectives, course outline, and criteria for grades',
          section_id: 1,
          score: 0,
        },
        {
          id: 4,
          title:
            'Extent to which interest in subject matter was generated in this course',
          section_id: 1,
          score: 0,
        },
        {
          id: 6,
          title:
            'Mastery and understanding of topics and problems discussed by teacher',
          section_id: 1,
          score: 0,
        },
        {
          id: 2,
          title:
            "Teacher's skill in relating course material to real life situations",
          section_id: 1,
          score: 0,
        },
      ],
      [
        {
          id: 11,
          title: "Teacher's management and control of class",
          section_id: 3,
          score: 0,
        },
        {
          id: 10,
          title: "Teacher's respect for students as individuals",
          section_id: 3,
          score: 0,
        },
      ],
      [
        {
          id: 13,
          title:
            "Teacher's concepts biblical values into course content and assignments",
          section_id: 4,
          score: 0,
        },
        {
          id: 12,
          title: "Teacher's prayers with students in class",
          section_id: 4,
          score: 0,
        },
      ],
      [],
      [
        {
          id: 14,
          title: "What is the percentage of teacher's attendance to class?",
          section_id: 5,
          score: 0,
        },
        {
          id: 15,
          title: "What is the percentage of teacher's punctuality to class",
          section_id: 5,
          score: 0,
        },
      ],
      [
        {
          id: 8,
          title: 'Clarity of assessment criteria',
          section_id: 2,
          score: 0,
        },
        {
          id: 9,
          title: 'Fairness of question and scoring procedure',
          section_id: 2,
          score: 0,
        },
      ],
    ];
  }

  handleError(error: HttpErrorResponse): Observable<never> {
    let errorMsg = '';

    if (error.status === 500) {
      errorMsg = 'Somthing went wrong on our end, please try again later';
    } else {
      errorMsg = error.error.error;
    }

    return throwError(() => new Error(errorMsg));
  }
}
