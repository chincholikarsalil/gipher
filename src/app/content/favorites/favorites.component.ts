import { Component, OnInit } from '@angular/core';
import { RecommendService } from 'src/app/services/recommend.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {

  constructor(public recommendService: RecommendService) { }

  ngOnInit(): void {
    this.recommendService.updateRecommendedArray();
  }

}
