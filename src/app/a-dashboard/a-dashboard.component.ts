import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { IEvaluation } from '../interfaces/evaluation';
import { name, commerce } from 'faker';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'se-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements OnInit {
  
  constructor() {}

  sidenavIsOpen: boolean = true;
  canClose: boolean = false;
  navStyle: MatDrawerMode = 'side';

  evaluationIsActive: boolean = false;
  interval: any;

  // this is not the name displayed it's an id used for mapping
  tableColumns: string[] = ["lecturer", "score", "course", "level"];

  recentEvaluations = new MatTableDataSource<IEvaluation>();

  ngOnInit(): void {

  }

  populateEvaluations(): void {
    this.interval = setInterval(() => {
      let newData = this.recentEvaluations.data.concat({
        lecturer: name.findName(),
        course: commerce.department(),
        level: Math.round(((Math.random() * 600) / 100)) * 100,
        score: parseFloat((Math.random() * 5).toFixed(2))
      })

      newData = newData.slice(-10, newData.length)
      this.recentEvaluations.data = newData;
    }, 1500)
  }

  clearInterval(): void {
    clearInterval(this.interval);
  }
  
  evaluationAction(): void {
    this.evaluationIsActive = !this.evaluationIsActive;

    if (this.evaluationIsActive) {
      this.populateEvaluations();
    } else {
      this.clearInterval()
    }
  }
}
