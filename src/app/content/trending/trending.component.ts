import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  p: number = 1;

  constructor(public fetchService: FetchService) { }

  ngOnInit(): void {
    this.fetchService.fetchTrendingGifs();
  }

}
