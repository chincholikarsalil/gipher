import { Component, OnInit } from '@angular/core';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FetchService } from '../services/fetch.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  searchIcon = faSearch;

  searchQuery: string = '';
  searchType: string = 'gif';

  constructor(private fetchService: FetchService) { }

  ngOnInit(): void {
  }

  search() {
    this.fetchService.searchQuery = this.searchQuery;
    this.fetchService.searchType = this.searchType;
    if(this.searchType == 'gif')
      this.fetchService.fetchSearchedGifs();
    else
      this.fetchService.fetchSearchedStickers();
  }

}
