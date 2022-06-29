import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { Subscription } from 'rxjs';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { IQuestion } from '../interfaces/question';
import { ISections } from '../interfaces/sections';
import { QuestionsService } from '../services/questions.service';

@Component({
  selector: 'se-s-dashboard',
  templateUrl: './s-dashboard.component.html',
  styleUrls: ['./s-dashboard.component.css'],
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
export class SDashboardComponent implements OnInit {

  error: string = "";

  department: string = "Software Engineering";
  readonly deptIsDisabled: boolean = true;
  readonly isLinear: boolean = true;
  formIsDisabled: string = 'true';
  stepper!: MatStepper;
  loading: boolean = false;

  sectionsSub$!: Subscription;
  questionsSub$!: Subscription;

  course: string = "";
  lecturer: string = "";

  courses: string[] = [
    'Angular',
    'React',
    'Vue',
    'Node',
    'Express',
    'MongoDB',
    'MySQL',
  ];

  lecturers: string[] = [
    "Mr Idowu Sunday",
    "Mr Taiwo Rosanwo",
    "Mr Peter Kalu",
    "Mrs Yaw Agyei",
    "Dr. Evans Micheal",
    "Prof. Jane Adamu"
  ]

  questionsArray: IQuestion[][] = []
  sectionsArray: ISections[] = [];

  openEndedRemark: string = "";
  remarkWordCount: number = 0;

  get _openEndedRemark(): string {
    return this.openEndedRemark;
  }

  set _openEndedRemark(value: string) {
    this.openEndedRemark = value;
  }

  constructor(
    private dialog: MatDialog,
    private questionsService: QuestionsService
  ) { }

  ngOnInit(): void {
    this.sectionsSub$ = this.questionsService.getSections().subscribe({
      next: (data) => { 
        this.sectionsArray = data;
      },
      error: () => {
        this.error = "There was an error retrieving the questions, please try again";
      }
    })
  }

  getQuestions(sectionId: number): void {
    this.loading = true;

    this.questionsSub$ = this.questionsService.getQuestionsForSection(sectionId).subscribe({
      next: (data) => {
        this.questionsArray.push(data);
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
    })
  }

  getWordCount(): void {
    this.remarkWordCount = this.openEndedRemark.split(" ").length;

    if (this.remarkWordCount > 150) {
      this.openEndedRemark = this.openEndedRemark.split(" ").slice(0, 150).join(' ');
    }
  }

  // 
  getAverageRating(): number {
    let sum = 0;
    let noOfQuestions = 0;
    for (let i = 0; i < this.questionsArray.length; i++) {
      for (let j = 0; j < this.questionsArray[i].length; j++) {
        sum += this.questionsArray[i][j].score;
      }
      noOfQuestions += this.questionsArray[i].length;
    }
    return sum / noOfQuestions;
  }

  // 
  submitEvaluation(): void {
    let dialogRef = this.dialog.open(CompletionDialogComponent, {
      width: '500px',
      data: {
        averageRating: this.getAverageRating().toFixed(2),
        lecturer: this.lecturer,
        course: this.course,
        department: this.department,
      }
    })

    dialogRef.afterClosed().subscribe(result => {
      this.stepper.reset();

      // reset all rating
      this.lecturer = "";
      this.course = "";
      this.openEndedRemark = "";
      this.remarkWordCount = 0;
      for (let i = 0; i < this.questionsArray.length; i++) {
        for (let j = 0; j < this.questionsArray[i].length; j++) {
          this.questionsArray[i][j].score = 0;
        }
      }
    })
  }

  formValueChanged(value: string, property: string): void {    
    if (property === 'course') {
      this.course = value;
    } else if (property === 'lecturer') {
      this.lecturer = value;
    }

    if (this.course && this.lecturer && this.department) {
      this.formIsDisabled = 'false';
    } else {
      this.formIsDisabled = 'true';
    }
  }
}
