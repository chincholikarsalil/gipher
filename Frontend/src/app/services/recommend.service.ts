import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../card';
import { UserInterestService } from './user-interest.service';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {

  recommendedArray: Array<Card> = [];
  card: Card | undefined;

  constructor(private http: HttpClient, private userInterestService: UserInterestService) {
    this.updateRecommendedArray();
  }

  get recommended(): Observable<any> {
    return this.http.get("http://localhost:8080/recommended/all-cards", { responseType: 'json' });
  }

  updateRecommendedArray() {
    this.recommended.subscribe(
      data => this.recommendedArray = data
    );
  }

  isRecommended(card: Card) {
    return this.userInterestService.userRecommendedArray?.find(c => c === card.id) ? true : false;
  }

  recommend(card: Card) {
    this.http.post<Card>("http://localhost:8080/card/recommend", card).subscribe();
  
    this.userInterestService.recommend(card.id);
    this.updateRecommendedArray();
    window.location.reload();
  }

  unrecommend(card: Card) {
    this.recommendedArray = this.recommendedArray.filter(
      (obj) => obj != this.recommendedArray.find(c => c.id === card.id)
    );
    this.http.post<Card>("http://localhost:8080/card/unrecommend", card).subscribe();
    this.userInterestService.unrecommend(card.id);
    this.updateRecommendedArray();
    window.location.reload();
  }
}
