import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ICompletionDialogData } from '../interfaces/completion-dialog-data';

@Component({
  selector: 'se-completion-dialog',
  templateUrl: './completion-dialog.component.html',
  styleUrls: ['./completion-dialog.component.css']
})
export class CompletionDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<CompletionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICompletionDialogData,
  ) { }
  
  ngOnInit(): void {
  }

}
