import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../card';
import { UserInterestService } from './user-interest.service';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  favoriteArray: Array<Card> = [];
  card: Card | undefined;

  constructor(private http: HttpClient, private userInterestService: UserInterestService) {
    this.updateFavoriteArray();
  }

  get favorites(): Observable<any> {
    return this.http.get<Array<Card>>("http://localhost:8080/favorite/all-cards", { responseType: 'json' });
  }

  updateFavoriteArray() {
    this.favorites.subscribe(
      data => {
        for(let i = 0; i < data.length; i++)
          if(this.userInterestService.userFavoriteArray.includes(data[i].id))
            this.favoriteArray.push(data[i]);
      },
      error => { }
    );
  }

  isFavorite(card: Card) {
    return this.userInterestService.userFavoriteArray?.find(c => c === card.id) ? true : false;
  }

  favorite(card: Card) {
    this.http.post<Card>("http://localhost:8080/card/favorite", card).subscribe();
    this.updateFavoriteArray();
    this.userInterestService.favorite(card.id);
    window.location.reload();
  }

  unfavorite(card: Card) {
    this.favoriteArray = this.favoriteArray.filter(
      (obj) => obj != this.favoriteArray.find(c => c.id === card.id)
    );
    this.http.post<Card>("http://localhost:8080/card/unfavorite", card).subscribe();
    this.updateFavoriteArray();
    this.userInterestService.unfavorite(card.id);
    window.location.reload();
  }

}
