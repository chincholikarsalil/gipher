import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Card } from '../../card';
import { FetchService } from '../../services/fetch.service';
import { RecommendService } from '../../services/recommend.service';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css']
})
export class CardDetailsComponent implements OnInit {

  card!: Card;

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;

  constructor(
    public recommendService: RecommendService,
      private acivatedRoute: ActivatedRoute,
        private fetchService: FetchService) { }

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.acivatedRoute.paramMap.subscribe(
      params => {
        this.fetchService.searchId = params.get('id')?.toString();
        this.fetchService.searchById.subscribe(
          data => 
            this.card = new Card(data.data.id, data.data.title, data.data.images.downsized.url)
        )
      }
    );
  }

}
