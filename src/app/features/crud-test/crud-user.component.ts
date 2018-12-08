import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

export interface CrudUserData {
  action: 'none' | 'delete' | 'update';
  first_name?: string;
  last_name?: string;
}

@Component({
  selector: 'cn-crud-user',
  template: `
    <h1 mat-dialog-title>Edit user</h1>
    <div mat-dialog-content>
      <mat-form-field>
        <input matInput #first [value]="data.first_name">
      </mat-form-field>
      <mat-form-field>
        <input matInput #last [value]="data.last_name">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onClick({ action: 'none' })">Close</button>
      <button mat-button color="warn" (click)="onClick({ action: 'delete' })">Delete</button>
      <button mat-button color="primary" (click)="onClick({ action: 'update', first_name: first.value, last_name: last.value })">Save</button>
    </div>
  `,
  styles: [`
    mat-form-field {
      width: 100%;
    }
  `]
})
export class CrudUserComponent {

  constructor(
    public dialogRef: MatDialogRef<CrudUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrudUserData
  ) {}

  onClick(data): void {
    this.dialogRef.close(data);
  }
}
