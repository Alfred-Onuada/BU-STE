import { Component, Input, OnInit } from '@angular/core';
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
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { IAddDialogData } from '../interfaces/add-dialog-data';
import { Chart, ChartData, ChartOptions } from 'chart.js';
import { ISemester } from '../interfaces/semester';
import { SharedNavService } from '../services/nav.service';

@Component({
  selector: 'se-a-dashboard',
  templateUrl: './a-dashboard.component.html',
  styleUrls: ['./a-dashboard.component.css']
})
export class ADashboardComponent implements OnInit {
  
  constructor(
    private questionService: QuestionsService,
    private dialog: MatDialog,
    private navService: SharedNavService
  ) {}

  // this is quite a confusing bunch but it's correct you can break it down if you wish
  private readonly chartRadius: number = window.innerWidth >= 1500 ? 110 : window.innerWidth >= 1200 ? 85 : window.innerHeight >= 1024 ? 120 : 120;
  isMobile: boolean = window.innerWidth <= 768;
  navIsClosed: boolean = true;

  sidenavIsOpen: boolean = true;
  canClose: boolean = false;
  navStyle: MatDrawerMode = 'side';

  faHouse: IconDefinition = faHouse;
  faUpdate: IconDefinition = faWrench;
  faReports: IconDefinition = faFilePdf;
  faDelete: IconDefinition = faTrash;
  faEdit: IconDefinition = faPen;

  activeMenu: string = 'dashboard';

  semesters: ISemester[] = [
    { title: '2022/2023 Summer Semester', evaluationIsActive: false, id: 1 },
    { title: '2022/2023 Medical Semester', evaluationIsActive: false, id: 2 },
    { title: '2022/2023 Regular Semester', evaluationIsActive: false, id: 3 },
    { title: '2022/2023 Post-SIWES Semester', evaluationIsActive: false, id: 4 }
  ]
  interval: any;

  chartOptions: ChartOptions<'doughnut'> = {
    cutout: '80%',
    radius: this.chartRadius,
    plugins: {
      legend: {
        labels: {
          boxHeight: 10,
          boxWidth: 10,
          boxPadding: 0,
        },
        position: 'bottom'
      },
    },
    responsive: true
  }

  aboveAverageRatioOptions: ChartOptions<'doughnut'> | any = {
    ...this.chartOptions,
    elements: {
      center: {
        text: '7,611 evaluations',
        chartRadius: this.chartRadius
      }
    }
  }
  aboverAverageRatio: ChartData<'doughnut'> = {
    labels: ["above 3.5", "below 3.5"],
    datasets: [
      {
        data: [3580, 4031],
        backgroundColor: ['green', '#003898'],
        hoverBackgroundColor: ['green', '#003898'],
        borderWidth: 0
      }
    ]
  }

  studentsToEvaluationRatioOptions: ChartOptions<'doughnut'> | any = {
    ...this.chartOptions,
    elements: {
      center: {
        text: '12,852 students',
        chartRadius: this.chartRadius
      }
    }
  }
  studentsToEvaluationRatio: ChartData<'doughnut'> = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [7611, 5241],
        backgroundColor: ['green', '#003898'],
        hoverBackgroundColor: ['green', '#003898'],
        borderWidth: 0
      }
    ]
  }

  sections: ISections[] = [];
  questions: IQuestion[][] = [];

  // this is not the name displayed it's an id used for mapping
  tableColumns: string[] = ["lecturer", "score", "course", "level"];

  recentEvaluations = new MatTableDataSource<IEvaluation>();

  ngOnInit(): void {
    this.sections = this.questionService.mockSections();
    this.questions = this.questionService.mockQuestions();

    Chart.register({
      id: 'textInCenter',
      beforeDraw: function (chart: any, args, options) {
        if (chart.config.options && chart.config.options.elements) {
          const centerConfig = chart.config.options.elements.center;
          const ctx = chart.ctx;

          // Get options from the center object in options
          var fontStyle = centerConfig.fontStyle || 'Comfortaa';
          var txt = centerConfig.text;
          var color = centerConfig.color || '#000';
          var maxFontSize = centerConfig.maxFontSize || 75;
          var sidePadding = centerConfig.sidePadding || 25;
          var sidePaddingCalculated = (sidePadding / 100) * (centerConfig.chartRadius * 2)
          // Start with a base font of 30px
          ctx.font = "30px " + fontStyle;

          // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
          var stringWidth = ctx.measureText(txt).width;
          var elementWidth = (centerConfig.chartRadius * 2) - sidePaddingCalculated;

          // Find out how much the font can grow in width.
          var widthRatio = elementWidth / stringWidth;
          var newFontSize = Math.floor(30 * widthRatio);
          var elementHeight = (centerConfig.chartRadius * 2);

          // Pick a new font size so it will not be larger than the height of label.
          var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
          var minFontSize = centerConfig.minFontSize;
          var lineHeight = centerConfig.lineHeight || 25;
          var wrapText = false;

          if (minFontSize === undefined) {
            minFontSize = 20;
          }

          if (minFontSize && fontSizeToUse < minFontSize) {
            fontSizeToUse = minFontSize;
            wrapText = true;
          }

          // Set font settings to draw it correctly.
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
          var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
          ctx.font = fontSizeToUse + "px " + fontStyle;
          ctx.fillStyle = color;

          if (!wrapText) {
            ctx.fillText(txt, centerX, centerY);
            return;
          }

          var words = txt.split(' ');
          var line = '';
          var lines = [];

          // Break words up into multiple lines if necessary
          for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var metrics = ctx.measureText(testLine);
            var testWidth = metrics.width;
            if (testWidth > elementWidth && n > 0) {
              lines.push(line);
              line = words[n] + ' ';
            } else {
              line = testLine;
            }
          }

          // Move the center up depending on line height and number of lines
          centerY -= (lines.length / 2) * lineHeight;

          for (var n = 0; n < lines.length; n++) {
            ctx.fillText(lines[n], centerX, centerY);
            centerY += lineHeight;
          }
          //Draw text in center
          ctx.fillText(line, centerX, centerY);
        }
      },
    })

    // updates the nav bar to either close or open
    this.navService.getState().subscribe(state => this.navIsClosed = state);
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

  addQuestionOrSection(type: string, sectionId: number | null): void {
    console.log(type, sectionId);
    let dialogRef = this.dialog.open(AddDialogComponent, {
      width: '500px',
      data: {
        type,
        sectionId
      }
    });

    dialogRef.afterClosed().subscribe((data: IAddDialogData) => {
      if (data.type == 'question') {
        if (typeof this.questions[data.sectionId] == 'undefined') {
          this.questions.push([])
        }

        this.questions[data.sectionId].push({
          id: this.questions[data.sectionId].length,
          title: data.title,
          score: 0,
          section_id: data.sectionId
        })
      } else if (data.type == 'section') {
        this.sections.push({
          completed: false,
          id: this.sections.length + 1,
          rate_max: 100,
          rate_min: 0,
          title: data.title
        })
      }
    })
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

    this.interval = null;
  }
  
  evaluationAction(semesterId: number): void {
    this.semesters[semesterId].evaluationIsActive = !this.semesters[semesterId].evaluationIsActive;

    let activeSemesters = this.semesters.filter(semester => semester.evaluationIsActive == true);

    if (activeSemesters.length && this.interval == null) {
      this.populateEvaluations();
      return;
    }
    
    if (activeSemesters.length == 0) {
      this.clearInterval();
    }
  }

  switch(section: string): void {
    this.activeMenu = section;

    // this will be useful on mobile
    if (this.isMobile) {
      this.navService.setState(true);
    }
  }
}
