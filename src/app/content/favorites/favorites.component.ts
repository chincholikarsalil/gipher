import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/card';
import { FavoriteService } from 'src/app/services/favorite.service';
import { UserInterestService } from 'src/app/services/user-interest.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  p: number = 1;

  favoriteArray: Array<Card> = [];

  constructor(public favoriteService: FavoriteService, public userInterestService: UserInterestService) { }

  ngOnInit(): void {
  }

}
