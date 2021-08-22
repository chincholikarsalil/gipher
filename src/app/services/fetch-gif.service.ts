import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  fetchedSearchedGifs: Array<any> = [];
  fetchedTrendingGifs: Array<any> = [];

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
        for(let i = 0; i < data.data.length; i++)
          this.fetchedTrendingGifs.push(data.data[i]);
      }
    );
  }

  fetchSearchedGifs() {
    this.searchedGifs.subscribe(
      data => {
        for(let i = 0; i < data.data.length; i++)
          this.fetchedSearchedGifs.push(data.data[i]);
      }
    );
  }

  fetchSearchedStickers() {
    this.searchedStickers.subscribe(
      data => {
        for(let i = 0; i < data.data.length; i++)
          this.fetchedSearchedGifs.push(data.data[i]);
      }
    );
  }

}
