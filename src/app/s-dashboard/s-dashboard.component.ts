import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { Question } from '../question';

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

  course: string = "";
  lecturer: string = "";

  questionsArray: Question[][] = [
    [
      {
        title: "How would you rate the lecturer?",
        rate: 0,
      },
      {
        title: "How does he handle the class?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's teaching style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's praying style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's dressing style?",
        rate: 0,
      },
    ],
    [
      {
        title: "How would you rate the lecturer?",
        rate: 0,
      },
      {
        title: "How does he handle the class?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's teaching style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's praying style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's dressing style?",
        rate: 0,
      },
    ],
    [
      {
        title: "How would you rate the lecturer?",
        rate: 0,
      },
      {
        title: "How does he handle the class?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's teaching style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's praying style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's dressing style?",
        rate: 0,
      },
    ],
    [
      {
        title: "How would you rate the lecturer?",
        rate: 0,
      },
      {
        title: "How does he handle the class?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's teaching style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's praying style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's dressing style?",
        rate: 0,
      },
    ],
    [
      {
        title: "How would you rate the lecturer?",
        rate: 0,
      },
      {
        title: "How does he handle the class?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's teaching style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's praying style?",
        rate: 0,
      },
      {
        title: "How would you rate the lecturer's dressing style?",
        rate: 0,
      },
    ],
  ]

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getAverageRating(): number {
    let sum = 0;
    for (let i = 0; i < this.questionsArray.length; i++) {
      for (let j = 0; j < this.questionsArray[i].length; j++) {
        sum += this.questionsArray[i][j].rate;
      }
    }
    return sum / (this.questionsArray.length * this.questionsArray[0].length);
  }

  submitEvaluation(): void {
    this.dialog.open(CompletionDialogComponent, {
      width: '500px',
      data: {
        averageRating: this.getAverageRating(),
        lecturer: this.lecturer,
        course: this.course,
        department: this.department,
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
