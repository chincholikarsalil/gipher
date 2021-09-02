import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
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

  currentPage!: string;

  faUser = faUser;

  constructor(private fetchService: FetchService, private router: Router) { }

  ngOnInit(): void {
    this.currentPage = window.location.href.split('/')[window.location.href.split('/').length - 1];
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
