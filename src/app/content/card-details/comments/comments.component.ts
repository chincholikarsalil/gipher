import { Component, Input, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/comment';
import { CommentService } from 'src/app/services/comment.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  cardId!: string;
  comment: string = '';

  userComment: Comment = new Comment();

  faDelete = faTrash;
  faUser = faUser;
  faLike = faThumbsUp;
  faDislike = faThumbsDown;

  constructor(private commentService: CommentService, private loginService: LoginService) {
  }

  ngOnInit(): void {
    this.commentService.cardId = this.cardId;
    this.commentService.fetchComments();
    this.userComment = this.commentService.userComment;
  }

  addComment() {
    this.commentService.cardId = this.cardId;
    this.commentService.comment = this.comment;
    this.commentService.addComment();
    window.location.reload();
  }

  deleteComment(commentId: string) {
    this.commentService.cardId = this.cardId;
    this.commentService.deleteComment(commentId);
    window.location.reload();
  }

  likeComment(commentId: string) {
    console.log(commentId);
    this.commentService.cardId = this.cardId;
    this.commentService.likeComment(commentId);
    window.location.reload();
  }

  dislikeComment(commentId: string) {
    console.log(commentId);
    this.commentService.cardId = this.cardId;
    this.commentService.dislikeComment(commentId);
    window.location.reload();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  loginOk() {
    window.location.href = "login";
  }
}
