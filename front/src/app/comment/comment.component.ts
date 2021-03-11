import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {CommentModel} from './comment.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit {
  @Input() comment: CommentModel = new CommentModel('', '', '', 0);
  @Output() updateComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();
  @Output() deleteComment: EventEmitter<CommentModel> = new EventEmitter<CommentModel>();

  constructor() {
  }

  ngOnInit(): void {
  }

  like(): void {
    const comment = {...this.comment} as CommentModel;
    comment.starts++;
    this.updateComment.emit(comment);
  }

  delete(): void {
    const comment = {...this.comment} as CommentModel;
    this.deleteComment.emit(comment);
  }
}
