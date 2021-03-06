import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatSelect, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { EntityOp } from 'ngrx-data';
import { User } from '../../data/models/user.model';
import { CrudUserComponent } from './crud-user.component';
import { UserService } from '../../data/services';

@Component({
  selector: 'cn-crud-test',
  template: `
    <p class="title">This route was generated <strong>server-side</strong> with <i>Angular Universal</i>.</p>
    <p>Try to refresh and inspect this page: you won't see any content in the root component.</p>

    <mat-form-field>
      <mat-select #select placeholder="Number of users" value="3" (valueChange)="onUserChange($event)">
        <mat-option value="3">3</mat-option>
        <mat-option value="6">6</mat-option>
        <mat-option value="9">9</mat-option>
      </mat-select>
    </mat-form-field>
    <button mat-raised-button color="accent" (click)="initializeAPI()">Initialize API</button>

    <mat-action-list *ngIf="users$ | async as users">
      <h3 mat-subheader>Users</h3>
      <mat-progress-bar *ngIf="!users.length" mode="indeterminate"></mat-progress-bar>
      <mat-list-item *ngFor="let user of users" (click)="onUserClick(user)">
        <img matListAvatar [src]="user.avatar">
        <h4 mat-line>{{ user.first_name }}</h4>
        <p mat-line>{{ user.last_name }} </p>
      </mat-list-item>
    </mat-action-list>
  `,
  styles: [`
    .title {
      font-size: 1.5rem;
    }
    mat-form-field {
      margin-right: 10px;
    }
  `]
})
export class CrudTestComponent implements OnInit {
  users$: Observable<User[]>;
  @ViewChild('select') matSelect: MatSelect;

  constructor(
    private userService: UserService,
    private http: HttpClient,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.users$ = this.userService.entities$;
  }

  ngOnInit() {
    this.onUserChange(3);
  }

  onUserChange(number) {
    this.userService.clearCache();
    this.userService.getWithQuery({
      'per_page': number
    });
  }

  /**
   * Show the CRUD dialog
   */
  onUserClick({ id, first_name, last_name }) {
    const dialogRef = this.dialog.open(CrudUserComponent, {
      width: '350px',
      data: { first_name, last_name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (result.action) {
          case 'update':
            this.updateUser({ id, first_name: result.first_name, last_name: result.last_name });
            break;
          case 'delete':
            this.deleteUser(id);
            break;
        }
      }
    });
  }

  /**
   * Optimistic updates!
   */
  updateUser(user) {
    this.userService.update(user, { isOptimistic: true }).pipe(take(1)).subscribe({
      next: v => console.log('User updated: ', v.id),
      error: () => this.userService.createAndDispatch(EntityOp.UNDO_ONE, user)
    });
  }

  deleteUser(id) {
    this.userService.delete(id);
  }

  initializeAPI() {
    this.http.get(environment.endpoint + '/init').subscribe(() => {
      const snackBarRef = this.snackBar.open('API was re-initialized!', 'Refresh', { duration: 5000 });
      snackBarRef.onAction().subscribe(() => {
        this.onUserChange(this.matSelect.value);
      });
    });
  }
}
