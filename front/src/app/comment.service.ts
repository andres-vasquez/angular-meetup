import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, Subject} from 'rxjs';
import {CommentModel} from './comment/comment.model';
import {environment} from '../environments/environment';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  $comments: Subject<Array<CommentModel>> = new Subject<Array<CommentModel>>();
  path = environment.api + '/comments';

  constructor(private http: HttpClient) {

  }

  subscribeToComments(): Observable<Array<CommentModel>> {
    return this.$comments;
  }

  getAllComments(): void {
    this.http.get<Array<CommentModel>>(this.path).subscribe((data) => {
      this.$comments.next(data);
    });
  }

  newComment(comment: CommentModel): Observable<boolean> {
    return this.http.post(`${this.path}`, comment)
      .pipe(
        tap(() => this.getAllComments()),
        map(() => true));
  }

  updateComment(comment: CommentModel): Observable<boolean> {
    return this.http.patch(`${this.path}/${comment.uuid}`, comment)
      .pipe(
        tap(() => this.getAllComments()),
        map(() => true));
  }

  deleteComment(comment: CommentModel): Observable<boolean> {
    return this.http.delete(`${this.path}/${comment.uuid}`)
      .pipe(
        tap(() => this.getAllComments()),
        map(() => true));
  }
}
