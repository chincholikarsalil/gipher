import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {

  recommendedArray: Array<Card> = [];
  card: Card | undefined;

  constructor(private http: HttpClient, private router: Router) {
    this.updateRecommendedArray();
  }

  get recommended(): Observable<any> {
    return this.http.get("http://localhost:8080/cards", {responseType: 'json'});
  }

  updateRecommendedArray() {
    this.recommended.subscribe(
      data => this.recommendedArray = data
    );
  }

  isRecommended(card: Card) {
    return this.recommendedArray.find(c => c.id === card.id) ? true : false;
  }

  recommend(card: Card) {
    card.recommend = true;
    if (!this.recommendedArray.find(c => c.id === card.id)) {
      this.http.post<Card>("http://localhost:8080/cards", card).subscribe();
    }
    this.updateRecommendedArray();
  }

  unrecommend(card: Card) {
    card.recommend = false;
    this.recommendedArray = this.recommendedArray.filter(
      (obj) => obj != this.recommendedArray.find(c => c.id === card.id)
    );
    this.http.delete("http://localhost:8080/cards/delete/" + card.id).subscribe();
  }
}
