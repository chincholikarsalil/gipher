import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { UserComment } from 'src/app/user-comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  cardId!: string;
  comment: string = '';

  userComment!: UserComment;
  userCommentArray!: Array<string>;

  faDelete = faTrash;
  faUser = faUser;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.fetchComments();
  }

  get allComments(): Observable<UserComment> {
      return this.http.get<UserComment>('http://localhost:8080/all-comments/' + this.cardId, {responseType: 'json'});
  }

  fetchComments() {
    this.allComments.subscribe(
      data => {
        if(data) {
          this.userCommentArray = data.comments.toString().split(',');
        }
      }
    );
  }

  addComment() {
    if (this.comment.length > 0) {
      this.userComment = new UserComment();
      this.userComment.id = this.cardId;
      this.userComment.comments = this.comment;
      this.http.post<string>('http://localhost:8080/comment/add', JSON.stringify(this.userComment)).subscribe();
      window.location.reload();
    }
  }

  deleteComment(index: number) {
    this.userComment = new UserComment();
    this.userComment.id = this.cardId;
    this.userComment.comments = index.toString();
    console.log(index.toString());
    this.http.post<string>('http://localhost:8080/comment/delete', JSON.stringify(this.userComment)).subscribe();
    window.location.reload();
  }

  isLoggedIn() {
    return true;
  }
}
