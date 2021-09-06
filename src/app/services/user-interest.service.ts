import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInterest } from '../user-interest';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class UserInterestService {

  userRecommendedArray: Array<string> = [];
  userFavoriteArray: Array<string> = []; 
  userLikedComments: Array<string> = [];

  constructor(private http: HttpClient, private loginService: LoginService) {
    this.fetchLikedComments();
    this.fetchUserRecommended();
    this.fetchUserFavorite();
  }

  get getUserLikedComments(): Observable<Array<string>> {
    return this.http.get<Array<string>>('http://localhost:8080/user/interest/comment/all/' + sessionStorage.getItem("username"), { responseType: 'json' });
  }

  get getUserRecommended(): Observable<Array<string>> {
    return this.http.get<Array<string>>('http://localhost:8080/user/interest/card/recommend/all/' + sessionStorage.getItem("username"), { responseType: 'json' });
  }

  get getUserFavorite(): Observable<Array<string>> {
    return this.http.get<Array<string>>('http://localhost:8080/user/interest/card/favorite/all/' + sessionStorage.getItem("username"), { responseType: 'json' });
  }

  fetchLikedComments() {
    if(this.loginService.isLoggedIn()) {
      this.getUserLikedComments.subscribe(
        data => {
          if(data)
            this.userLikedComments = data;
        }
      );
    }
  }

  fetchUserRecommended() {
    if(this.loginService.isLoggedIn()) {
      this.getUserRecommended.subscribe(
        data => {
          if(data)
            this.userRecommendedArray = data;
        }
      )
    }
  }

  fetchUserFavorite() {
    if(this.loginService.isLoggedIn()) {
      this.getUserFavorite.subscribe(
        data => {
          if(data)
            this.userFavoriteArray = data;
        }
      )
    }
  }

  likeComment(commentId: string) {
    this.http.post<Array<string>>('http://localhost:8080/user/interest/comment/like', {"username": sessionStorage.getItem("username"), "commentId": commentId}).subscribe(
      data => this.userLikedComments = data
    );
  }

  dislikeComment(commentId: string) {
    this.http.post<Array<string>>('http://localhost:8080/user/interest/comment/dislike', {"username": sessionStorage.getItem("username"), "commentId": commentId}).subscribe(
      data => this.userLikedComments = data
    );
  }

  recommend(cardId: string) {
    this.http.post<UserInterest>("http://localhost:8080/user/interest/card/recommend", {"username": sessionStorage.getItem("username"), "cardId": cardId}).subscribe(
      data => {
        this.userRecommendedArray = data.recommend;
      }
    );
  }

  unrecommend(cardId: string) {
    this.http.post<UserInterest>("http://localhost:8080/user/interest/card/unrecommend", {"username": sessionStorage.getItem("username"), "cardId": cardId}).subscribe(
      data => {
        this.userRecommendedArray = data.recommend;
      }
    );
  }

  favorite(cardId: string) {
    this.http.post<UserInterest>("http://localhost:8080/user/interest/card/favorite", {"username": sessionStorage.getItem("username"), "cardId": cardId}).subscribe(
      data => {
        this.userFavoriteArray = data.favorite;
      }
    );
  }

  unfavorite(cardId: string) {
    this.http.post<UserInterest>("http://localhost:8080/user/interest/card/unfavorite", {"username": sessionStorage.getItem("username"), "cardId": cardId}).subscribe(
      data => {
        this.userFavoriteArray = data.favorite;
      }
    );
  }

}
