import { Component, OnInit } from '@angular/core';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void {
    this.fetchService.fetchTrendingGifs();
  }

}
