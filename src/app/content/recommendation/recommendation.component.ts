import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {
  
  fetchedTrendingGifs: Array<any> = [];

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;
  recommend = false;

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void {
    this.fetchService.fetchTrendingGifs();
    this.fetchedTrendingGifs = this.fetchService.fetchedTrendingGifs;
  }

}
