import { Component, OnInit } from '@angular/core';
import { MatDrawerMode } from '@angular/material/sidenav';
import { IEvaluation } from '../interfaces/evaluation';
import { name, commerce } from 'faker';
import { MatTableDataSource } from '@angular/material/table';
import { faFilePdf, faHouse, faPen, faTrash, faWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { ISections } from '../interfaces/sections';
import { IQuestion } from '../interfaces/question';
import { QuestionsService } from '../services/questions.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmationDialogComponent } from '../delete-confirmation-dialog/delete-confirmation-dialog.component';
import { IDeleteDialogData } from '../interfaces/delete-dialog-data';
import { EditDialogComponent } from '../edit-dialog/edit-dialog.component';
import { IUpdateDialogData } from '../interfaces/update-dialog-data';

@Component({
  selector: 'se-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements OnInit {
  
  constructor(
    private questionService: QuestionsService,
    private dialog: MatDialog
  ) {}

  sidenavIsOpen: boolean = true;
  canClose: boolean = false;
  navStyle: MatDrawerMode = 'side';

  faHouse: IconDefinition = faHouse;
  faUpdate: IconDefinition = faWrench;
  faReports: IconDefinition = faFilePdf;
  faDelete: IconDefinition = faTrash;
  faEdit: IconDefinition = faPen;

  activeMenu: string = 'dashboard';

  evaluationIsActive: boolean = false;
  interval: any;

  sections: ISections[] = [];
  questions: IQuestion[][] = [];

  // this is not the name displayed it's an id used for mapping
  tableColumns: string[] = ["lecturer", "score", "course", "level"];

  recentEvaluations = new MatTableDataSource<IEvaluation>();

  ngOnInit(): void {
    this.sections = this.questionService.mockSections();
    this.questions = this.questionService.mockQuestions();
  }

  deleteSection(id: number): void {
    this.sections = this.sections.filter(section => section.id != id);
  }

  editSection(id: number, title: string): void {
    this.sections.forEach(section => {
      if (section.id == id) {
        section.title = title;
      }
    })
  }

  deleteDialog(id: number, type: string, sectionId: number | null): void {
    let dialogRef = this.dialog.open(DeleteConfirmationDialogComponent, {
      width: '400px',
      data: {
        id,
        type,
        sectionId
      }
    })

    dialogRef.afterClosed().subscribe((data: IDeleteDialogData | null) => {
      if (data != null) {
        if (data.type == 'section') {
          this.deleteSection(data.id)
        } else if (data.type == 'question') {
          this.deleteQuestion(data.id, data.type, data.sectionId)
        }
      }
    })
  }

  editDialog(id: number, type: string, sectionId: number | null): void {
    let dialogRef = this.dialog.open(EditDialogComponent, {
      width: '500px',
      data: {
        id,
        type,
        sectionId
      }
    })

    dialogRef.afterClosed().subscribe((update: IUpdateDialogData | null) => {
      if (update != null) {
        if (update.type == 'section') {
          this.editSection(update.id, update.title)
        } else if (update.type == 'question') {
          this.editQuestion(update.id, update.title, update.sectionId);
        }
      }
    })
  }

  editQuestion(id: number, title: string, sectionId: number, ): void {
    this.questions[sectionId].forEach(question => {
      if (question.id == id) {
        question.title = title;
      }
    })
  }

  deleteQuestion(id: number, type: string, sectionId: number): void {
    this.questions[sectionId] = this.questions[sectionId].filter(question => question.id != id);
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

  switch(section: string): void {
    this.activeMenu = section;
  }
}
