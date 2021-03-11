import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CommentModel} from '../comment.model';

@Component({
  selector: 'app-new-comment-dialog',
  templateUrl: 'new-comment-dialog.component.html',
})
export class NewCommentDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<NewCommentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CommentModel) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
