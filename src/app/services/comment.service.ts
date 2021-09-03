import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment, CommentDetails, TweakComment } from '../comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  cardId!: string;
  comment: string = '';

  userComment: Comment = new Comment();
  commentDetails!: CommentDetails;

  constructor(private http: HttpClient) {
  }

  get allComments(): Observable<Comment> {
    return this.http.get<Comment>('http://localhost:8080/all-comments/' + this.cardId, { responseType: 'json' });
  }

  fetchComments() {
    this.allComments.subscribe(
      data => {
        if (data) {
          this.userComment.cardId = data.cardId;
          this.userComment.comments = data.comments;
        }
      }
    );
  }

  addComment() {
    if (this.comment.length > 0) {
      let userComment = new Comment();
      userComment.cardId = this.cardId;

      this.commentDetails = new CommentDetails();
      this.commentDetails.comment = this.comment;
      this.commentDetails.commentId = "salil" + Math.random().toString();

      userComment.comments.push(this.commentDetails)

      this.http.post<string>('http://localhost:8080/comment/add', JSON.stringify(userComment)).subscribe();
    }
  }

  deleteComment(commentId: string) {
    let deleteComment = new TweakComment();
    deleteComment.cardId = this.cardId;
    deleteComment.comments = commentId;

    this.http.post<string>('http://localhost:8080/comment/delete', JSON.stringify(deleteComment)).subscribe();
  }

  likeComment(commentId: string) {
    let likeComment = new TweakComment();
    likeComment.cardId = this.cardId;
    likeComment.comments = commentId;

    this.http.post<string>('http://localhost:8080/comment/like', JSON.stringify(likeComment)).subscribe();
  }

  dislikeComment(commentId: string) {
    let dislikeComment = new TweakComment();
    dislikeComment.cardId = this.cardId;
    dislikeComment.comments = commentId;

    this.http.post<string>('http://localhost:8080/comment/dislike', JSON.stringify(dislikeComment)).subscribe();
  }

}
