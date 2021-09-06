import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/card';
import { FetchService } from 'src/app/services/fetch.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  p: number = 1;
  searchArray: Array<Card> = [];

  constructor(public fetchService: FetchService) { }

  ngOnInit(): void {
    this.fetch();
    document.getElementById('search')!.style.display = 'none';
    setTimeout(() => { document.getElementById('search')!.style.display = 'block'; }, 1000);
  }

  fetch() {
    if(window.sessionStorage.getItem("query")) {
      let array = JSON.parse(window.sessionStorage.getItem(window.sessionStorage.getItem("query")!.toString())!.toString());
      for (let i = 0; i < array.length; i++) {
        this.searchArray.push(array[i]);
      }
    }
  }

}
