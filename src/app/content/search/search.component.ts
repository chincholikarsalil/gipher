import { Component, OnInit } from '@angular/core';
import { FetchGIFService } from 'src/app/services/fetch-gif.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(public fetchService: FetchGIFService) { }

  ngOnInit(): void {
  }

}
