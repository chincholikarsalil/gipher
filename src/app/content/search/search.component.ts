import { Component, OnInit } from '@angular/core';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  fetchedSearchedGifs: Array<any> = [];

  faRecommend = faArrowUp;
  faUnrecommend = faArrowDown;
  recommend = false;

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void {
    this.fetchedSearchedGifs = this.fetchService.fetchedSearchedGifs;
  }

}
