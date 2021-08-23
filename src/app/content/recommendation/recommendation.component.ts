import { Component, OnInit } from '@angular/core';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.css']
})
export class RecommendationComponent implements OnInit {

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void { }

}
