import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/card';
import { FetchService } from 'src/app/services/fetch.service';
import { RecommendService } from 'src/app/services/recommend.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  cardArray!: Array<Card>;

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;

  constructor(public fetchService: FetchService, public recommendService: RecommendService) { }

  ngOnInit(): void {
  }

}
