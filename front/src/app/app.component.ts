import {AfterViewInit, Component} from '@angular/core';
import {CommentService} from './comment.service';
import {CommentModel} from './comment/comment.model';
import {Observable, of} from 'rxjs';
import {finalize, tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {NewCommentDialogComponent} from './comment/dialog/new-comment-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  $loading = of(false);
  $comments = this.service.subscribeToComments();

  constructor(private service: CommentService,
              private dialog: MatDialog,
              private snackBar: MatSnackBar) {
  }

  ngAfterViewInit(): void {
    this.getAllComments();
  }

  updateComment(comment: CommentModel): void {
    this.$loading = of(true);
    this.service.updateComment(comment)
      .pipe(
        tap(() => this.showMessage('Gracias!')),
        finalize(() => this.$loading = of(false))
      ).subscribe();
  }

  newComment(comment: CommentModel): void {
    this.$loading = of(true);
    this.service.newComment(comment)
      .pipe(
        tap(() => this.showMessage('Muchas Gracias!')),
        finalize(() => this.$loading = of(false))
      ).subscribe();
  }

  deleteComment(comment: CommentModel): void {
    this.service.deleteComment(comment).pipe(
      tap(() => this.showMessage('Acción realizada!')),
      finalize(() => this.$loading = of(false))
    ).subscribe();
  }

  getAllComments(): void {
    this.service.getAllComments();
  }

  openNewPopup(): void {
    const dialogRef = this.dialog.open(NewCommentDialogComponent,
      {
        data: new CommentModel('', '', '', 0)
      });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.newComment(result);
      }
    });
  }

  showMessage(message: string): void {
    this.snackBar.open(message);
  }
}
