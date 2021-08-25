import { Component, OnInit } from '@angular/core';
import { RecommendService } from 'src/app/services/recommend.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  constructor(public recommendService: RecommendService) { }

  ngOnInit(): void {
    this.recommendService.updateRecommendedArray();
  }

}
