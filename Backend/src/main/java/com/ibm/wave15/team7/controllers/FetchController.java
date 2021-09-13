package com.ibm.wave15.team7.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.ibm.wave15.team7.entities.Card;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class FetchController {

	Card card;

	String apiKey = "?api_key=4KGXeJoyKX44M778eixNOR5Ec1P9p5tX";
	String searchByIdEndpoint = "https://api.giphy.com/v1/gifs/";
	String searchGIFEndpoint = "http://api.giphy.com/v1/gifs/search";
	String searchStickerEndpoint = "https://api.giphy.com/v1/stickers/search";
	String trendingEndpoint = "https://api.giphy.com/v1/gifs/trending";
	String limit = "&limit=" + 36;
	String tail = "&rating=g&lang=en";
	String query = "&q=";
	String commonPart = apiKey + limit + tail;
	String entireUrl;

	RestTemplate restTemplate = new RestTemplate();
	String response;

	String id;
	String title;
	String imgUrl;

	@GetMapping("/search/id/{searchId}")
	public Card searchById(@PathVariable String searchId) {

		this.entireUrl =  this.searchByIdEndpoint + searchId + this.apiKey;

		this.response = this.restTemplate.getForObject(this.entireUrl, String.class);

		JSONObject data = new JSONObject(this.response).getJSONObject("data");

		this.id = data.getString("id");
		this.title = data.getString("title");
		this.imgUrl = data.getJSONObject("images").getJSONObject("downsized").getString("url");

		this.card = new Card(id, title, imgUrl);

		return card;
	}

	private List<Card> getCardList(String entireUrl) {

		List<Card> cardList = new ArrayList<Card>();
		
		this.response = this.restTemplate.getForObject(entireUrl, String.class);

		JSONArray data = new JSONObject(this.response).getJSONArray("data");

		for(int i = 0; i < data.length(); i++) {
			this.id = data.getJSONObject(i).getString("id");
			this.title = data.getJSONObject(i).getString("title");
			try {
				this.imgUrl = data.getJSONObject(i).getJSONObject("images").getJSONObject("downsized").getString("url");
			} catch(Exception e ) {
				this.imgUrl = data.getJSONObject(i).getJSONObject("images").getJSONObject("original").getString("url");
			}
			this.card = new Card(this.id, this.title, this.imgUrl);
			cardList.add(card);
		}
		return cardList;
	}

	@GetMapping("/trending")
	public List<Card> trending() {

		this.entireUrl =  this.trendingEndpoint + this.commonPart;
		return getCardList(this.entireUrl);

	}

	@GetMapping("/search/gif/{query}")
	public List<Card> searchGif(@PathVariable String query) {

		this.entireUrl =  this.searchGIFEndpoint + this.commonPart + this.query + query;
		return getCardList(this.entireUrl);

	}

	@GetMapping("/search/sticker/{query}")
	public List<Card> searchSticker(@PathVariable String query) {

		this.entireUrl =  this.searchStickerEndpoint + this.commonPart + this.query + query;
		return getCardList(this.entireUrl);

	}

}
