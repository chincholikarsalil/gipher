import { Component, OnInit } from '@angular/core';
import { RecommendService } from 'src/app/services/recommend.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  p: number = 1;

  constructor(public recommendService: RecommendService) {
    if(!sessionStorage.getItem("username"))
      window.location.href = "/login";
  }

  ngOnInit(): void {
    window.sessionStorage.removeItem(window.sessionStorage.getItem("query")!.toString());
    this.recommendService.updateRecommendedArray();
  }

}
