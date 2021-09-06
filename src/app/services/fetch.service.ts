import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private httpClient: HttpClient) { }

  searchQuery: string = '';
  searchType: string = 'gif';

  trendingQuery = "http://localhost:8080/trending";
  searchByIdEndpoint = "http://localhost:8080/search/id/";
  searchGIFEndpoint = "http://localhost:8080/search/gif/";
  searchStickerEndpoint = "http://localhost:8080/search/sticker/";
  searchId!: string | undefined;

  noResults: string = '';
  searchArray: Array<Card> = [];
  trendingArray: Array<Card> = [];

  get trendingGifs(): Observable<any> {
    return this.httpClient.get(this.trendingQuery, {responseType: 'json'});
  }

  get searchedGifs(): Observable<any> {
    let entireQuery = this.searchGIFEndpoint + this.searchQuery;
    return this.httpClient.get(entireQuery, {responseType: 'json'});
  }

  get searchedStickers(): Observable<any> {
    let entireQuery = this.searchStickerEndpoint + this.searchQuery;
    return this.httpClient.get(entireQuery, {responseType: 'json'});
  }

  get searchById(): Observable<any> {
    let entireQuery = this.searchByIdEndpoint + this.searchId;
    return this.httpClient.get(entireQuery, {responseType: 'json'});
  }

  fetch(getCardList: Observable<any>, cardArray: Array<Card>) {
    getCardList.subscribe(
      data => {
        if(data.length == 0) {
          this.noResults = "No result found";
        } else {
          for(let card of data) {
            cardArray.push(new Card(card.id, card.title, card.imgUrl));
          }
          if(this.searchQuery.length > 0) {
            window.sessionStorage.setItem("query", this.searchQuery);
            window.sessionStorage.setItem(this.searchQuery, JSON.stringify(cardArray));
            if(window.location.href.split('/')[window.location.href.split('/').length - 1] != 'dashboard')
              window.location.href = '/dashboard';
            else
              window.location.reload();
          }
        }
      }
    );
  }

  fetchTrendingGifs() {
    this.fetch(this.trendingGifs, this.trendingArray);
  }

  fetchSearchedGifs() {
    if(window.sessionStorage.getItem("query"))
      window.sessionStorage.removeItem(window.sessionStorage.getItem("query")!.toString());
    this.fetch(this.searchedGifs, this.searchArray);
  }

  fetchSearchedStickers() {
    if(window.sessionStorage.getItem("query"))
      window.sessionStorage.removeItem(window.sessionStorage.getItem("query")!.toString());
    this.fetch(this.searchedStickers, this.searchArray);
  }

}
