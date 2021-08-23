import { Component, Input, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Card } from 'src/app/card';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input()
  card!: Card;

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void {
  }

}
