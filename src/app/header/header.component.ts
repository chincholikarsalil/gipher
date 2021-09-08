import { Component, OnInit } from '@angular/core';
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FetchService } from '../services/fetch.service';
import { LoginService } from '../services/login.service';

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
  username = sessionStorage.getItem("username");

  imgUrl!: string;

  userImage: string = '';

  show: boolean = false;

  constructor(private fetchService: FetchService, public loginService: LoginService) { }

  ngOnInit(): void {
    this.currentPage = window.location.href.split('/')[window.location.href.split('/').length - 1];
    this.getGipherLogo()
  }

  getGipherLogo() {
    this.fetchService.searchId = "VIWVhLsuxwBPtLYX8k";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );

    if(window.sessionStorage.getItem("userPicture"))
      this.userImage = window.sessionStorage.getItem("userPicture")!.toString();
  }

  search() {
    this.fetchService.searchQuery = this.searchQuery;
    this.fetchService.searchType = this.searchType;
    if(this.searchType == 'gif') {
      this.fetchService.fetchSearchedGifs();
    } else {
      this.fetchService.fetchSearchedStickers();
    }
  }

}
