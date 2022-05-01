import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'se-t-dashboard',
  templateUrl: './t-dashboard.component.html',
  styleUrls: ['./t-dashboard.component.css'],
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
export class TDashboardComponent implements OnInit {

  error: string = '';
  formIsDisabled: string = 'true';
  departments: string[] = [
    'Computer Science',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Biology',
    'English',
    'History'
  ];
  courses: string[] = [
    'Angular',
    'React',
    'Vue',
    'Node',
    'Express',
    'MongoDB',
    'MySQL',
  ];
  levels: string[] = [
    '100 Level',
    '200 Level',
    '300 Level',
    '400 Level',
  ];

  course: string = '';
  level: string = '';
  department: string = '';

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  getReports(): void {
    this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        course: this.course,
        level: this.level,
        department: this.department,
        noOfReviews: Math.floor(Math.random() * 10000) + 1,
        averageRating: Math.random() * 5,
      }
    })
  }

  formValueChanged(value: string, property: string): void {
    
    if (property === 'course') {
      this.course = value;
    } else if (property === 'level') {
      this.level = value;
    } else if (property === 'department') {
      this.department = value;
    }

    if (this.course && this.level && this.department) {
      this.formIsDisabled = 'false';
    } else {
      this.formIsDisabled = 'true';
    }
  }

}
