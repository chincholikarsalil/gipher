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
    document.getElementById('trending')!.style.display = 'none';
    setTimeout(() => { document.getElementById('preloader')!.style.display = 'none'; }, 500);
    setTimeout(() => { document.getElementById('trending')!.style.display = 'block'; }, 500);
  }

}
