import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Card } from '../card';

@Injectable({
  providedIn: 'root'
})
export class FetchGIFService {

  constructor(private httpClient: HttpClient) { }

  searchQuery: string = '';
  searchType: string = 'gif';
  searchEndpoint = "http://api.giphy.com/v1/gifs/search";
  searchStickerEndpoint = "https://api.giphy.com/v1/stickers/search";
  trendingEndpoint = "https://api.giphy.com/v1/gifs/trending";
  api_key = "?api_key=4KGXeJoyKX44M778eixNOR5Ec1P9p5tX";
  query = "&q=";
  limit = "&limit=6";
  tail = "&rating=g&lang=en";

  entireQuery = '';
  trendingQuery = this.trendingEndpoint + this.api_key + this.limit + this.tail;

  noResults: string = '';
  searchArray: Array<Card> = [];
  trendingArray: Array<Card> = [];
  recommendedArray: Array<Card> = [];
  card: Card | undefined;

  get trendingGifs(): Observable<any> {
    return this.httpClient.get(this.trendingQuery, {responseType: 'json'});
  }

  get searchedGifs(): Observable<any> {
    this.entireQuery = this.searchEndpoint + this.api_key + this.limit + this.tail + this.query + this.searchQuery;
    return this.httpClient.get(this.entireQuery, {responseType: 'json'});
  }

  get searchedStickers(): Observable<any> {
    this.entireQuery = this.searchStickerEndpoint + this.api_key + this.limit + this.tail + this.query + this.searchQuery;
    return this.httpClient.get(this.entireQuery, {responseType: 'json'});
  }

  fetchTrendingGifs() {
    this.trendingGifs.subscribe(
      data => {
        if(data.data.length == 0)
          this.noResults = "No result found";
        else
          for(let i = 0; i < data.data.length; i++) {
            this.card = new Card(data.data[i].title, data.data[i].images.downsized.url);
            this.trendingArray.push(this.card);
          }
      }
    );
  }

  fetchSearchedGifs() {
    this.searchedGifs.subscribe(
      data => {
        if(data.data.length == 0)
          this.noResults = "No result found";
        else
          for(let i = 0; i < data.data.length; i++){
            this.card = new Card(data.data[i].title, data.data[i].images.downsized.url);
            this.searchArray.push(this.card);
          }
      }
    );
  }

  fetchSearchedStickers() {
    this.searchedStickers.subscribe(
      data => {
        for(let i = 0; i < data.data.length; i++) {
          this.card = new Card(data.data[i].title, data.data[i].images.downsized.url);
          this.searchArray.push(this.card);
        }
      }
    );
  }

  recommend(card: Card) {
    card.recommend = true;
    if (!this.recommendedArray.find(c => c.title === card.title)) {
      this.recommendedArray.push(card);
    }
  }

  unrecommend(card: Card) {
    card.recommend = false;
    this.recommendedArray = this.recommendedArray.filter((obj) => obj != this.recommendedArray.find(c => c.title === card.title));
  }

}
