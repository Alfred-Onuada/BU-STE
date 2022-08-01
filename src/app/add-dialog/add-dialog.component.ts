import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { IAddDialogData } from '../interfaces/add-dialog-data';

@Component({
  selector: 'se-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css']
})
export class AddDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IAddDialogData,
  ) { }
  
  error: string = '';

  _title: string = '';

  get title(): string {
    return this._title;
  }

  set title(value: string) {
    this._title = value;
  }

  ngOnInit(): void {}

  saveTitle(): void {
    if (this._title == '') {
      this.error = 'Please enter a title';

      setTimeout(() => {
        this.error = '';
      }, 3500);
      return;
    }

    this.dialogRef.close({
      title: this._title,
      type: this.data.type,
      sectionId: this.data.sectionId
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }

}
