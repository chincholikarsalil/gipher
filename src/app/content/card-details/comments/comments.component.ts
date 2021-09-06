import { Component, Input, OnInit } from '@angular/core';
import { faThumbsDown, faThumbsUp, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { Comment } from 'src/app/comment';
import { CommentService } from 'src/app/services/comment.service';
import { LoginService } from 'src/app/services/login.service';
import { UserInterestService } from 'src/app/services/user-interest.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input()
  cardId!: string;
  comment: string = '';
  username: string = sessionStorage.getItem("username")?.toString() || "";

  userComment: Comment = new Comment();
  userLikedComments: Array<string> = []

  faDelete = faTrash;
  faUser = faUser;
  faLike = faThumbsUp;
  faDislike = faThumbsDown;

  constructor(private commentService: CommentService, private loginService: LoginService, private userInterestService: UserInterestService) {
  }

  ngOnInit(): void {
    this.commentService.cardId = this.cardId;
    this.commentService.fetchComments();
    this.userInterestService.fetchLikedComments();
    this.userComment = this.commentService.userComment;
    this.userLikedComments = this.userInterestService.userLikedComments;
    console.log(this.userInterestService.userLikedComments);
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
    this.commentService.cardId = this.cardId;
    this.commentService.likeComment(commentId);
    this.userInterestService.likeComment(commentId);
    window.location.reload();
  }

  dislikeComment(commentId: string) {
    this.commentService.cardId = this.cardId;
    this.commentService.dislikeComment(commentId);
    this.userInterestService.dislikeComment(commentId);
    window.location.reload();
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  loginOk() {
    window.location.href = "login";
  }
}
