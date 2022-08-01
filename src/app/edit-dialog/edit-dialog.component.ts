import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CompletionDialogComponent } from '../completion-dialog/completion-dialog.component';
import { IUpdateDialogData } from '../interfaces/update-dialog-data';

@Component({
  selector: 'se-edit-dialog',
  templateUrl: './edit-dialog.component.html',
  styleUrls: ['./edit-dialog.component.css'],
})
export class EditDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUpdateDialogData
  ) {}

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
      id: this.data.id,
      type: this.data.type,
      sectionId: this.data.sectionId,
    });
  }

  cancel(): void {
    this.dialogRef.close(null);
  }
}
