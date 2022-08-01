import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { IDeleteDialogData } from '../interfaces/delete-dialog-data';

@Component({
  selector: 'se-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDeleteDialogData
  ) {}

  ngOnInit(): void {}

  agree(): void {
    this.dialogRef.close({
      id: this.data.id,
      type: this.data.type,
      sectionId: this.data.sectionId,
    });
  }

  disagree(): void {
    this.dialogRef.close(null);
  }
}
