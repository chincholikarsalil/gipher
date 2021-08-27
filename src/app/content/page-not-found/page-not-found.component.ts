import { Component, OnInit } from '@angular/core';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  imgUrl!: string;

  constructor(private fetchService: FetchService) {}

  ngOnInit(): void {
    this.getNotFoundGif();
  }

  getNotFoundGif() {
    this.fetchService.searchId = "lqFHf5fYMSuKcSOJph";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );
  }

}
