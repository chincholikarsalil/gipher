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
    document.getElementById('not-found')!.style.display = 'none';
    setTimeout(() => {document.getElementById('preloader')!.style.display = 'none';}, 1000);
    setTimeout(() => {document.getElementById('not-found')!.style.display = 'block';}, 1000);
  }

  getNotFoundGif() {
    this.fetchService.searchId = "dsWhAIVlKZJrn5VdZv";
    this.fetchService.searchById.subscribe(
      data => {
        this.imgUrl = data.imgUrl
      }
    );
  }

}
