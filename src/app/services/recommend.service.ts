import { Injectable } from '@angular/core';
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class RecommendService {

  recommendedArray: Array<Card> = [];
  card: Card | undefined;

  constructor() { }

  recommend(card: Card) {
    card.recommend = true;
    if (!this.recommendedArray.find(c => c.title === card.title)) {
      this.recommendedArray.push(card);
    }
  }

  unrecommend(card: Card) {
    card.recommend = false;
    this.recommendedArray = this.recommendedArray.filter(
      (obj) => obj != this.recommendedArray.find(c => c.title === card.title)
    );
  }
}
