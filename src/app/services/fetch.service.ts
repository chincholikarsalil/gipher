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
  searchByIdEndpoint = "https://api.giphy.com/v1/gifs/";
  searchGIFEndpoint = "http://api.giphy.com/v1/gifs/search";
  searchStickerEndpoint = "https://api.giphy.com/v1/stickers/search";
  trendingEndpoint = "https://api.giphy.com/v1/gifs/trending";
  api_key = "?api_key=4KGXeJoyKX44M778eixNOR5Ec1P9p5tX";
  limit = "&limit=" + 6;
  tail = "&rating=g&lang=en";
  query = "&q=";
  searchId!: string | undefined;

  searchQueryPart = this.api_key + this.limit + this.tail + this.query;
  trendingQuery = this.trendingEndpoint + this.api_key + this.limit + this.tail;
  entireQuery = '';

  noResults: string = '';
  card!: Card;
  searchArray: Array<Card> = [];
  trendingArray: Array<Card> = [];

  get trendingGifs(): Observable<any> {
    return this.httpClient.get(this.trendingQuery, {responseType: 'json'});
  }

  get searchedGifs(): Observable<any> {
    this.entireQuery = this.searchGIFEndpoint + this.searchQueryPart + this.searchQuery;
    return this.httpClient.get(this.entireQuery, {responseType: 'json'});
  }

  get searchedStickers(): Observable<any> {
    this.entireQuery = this.searchStickerEndpoint + this.searchQueryPart + this.searchQuery;
    return this.httpClient.get(this.entireQuery, {responseType: 'json'});
  }

  get searchById(): Observable<any> {
    this.entireQuery = this.searchByIdEndpoint + this.searchId + this.api_key;
    return this.httpClient.get(this.entireQuery, {responseType: 'json'});
  }

  fetch(getCardArray: Observable<any>, cardArray: Array<Card>) {
    getCardArray.subscribe(
      data => {
        if(data.data.length == 0) {
          this.noResults = "No result found";
        } else {
          for(let i = 0; i < data.data.length; i++){
            this.card = new Card(data.data[i].id, data.data[i].title, data.data[i].images.downsized.url);
            cardArray.push(this.card);
          }
        }
      }
    );
  }

  fetchTrendingGifs() {
    this.fetch(this.trendingGifs, this.trendingArray);
  }

  fetchSearchedGifs() {
    this.fetch(this.searchedGifs, this.searchArray);
  }

  fetchSearchedStickers() {
    this.fetch(this.searchedStickers, this.searchArray);
  }

}
