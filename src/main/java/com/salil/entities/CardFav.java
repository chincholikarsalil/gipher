package com.salil.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "favorites")
public class CardFav {

	@Id
	private String id;
	private String title;
	private String imgUrl;
	private int favoriteCount;

	public CardFav(String id, String title, String imgUrl) {
		this.id = id;
		this.title = title;
		this.imgUrl = imgUrl;
		this.favoriteCount = 0;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public int getFavoriteCount() {
		return favoriteCount;
	}

	public void increment() {
		this.favoriteCount += 1;
	}
	
	public void decrement() {
		this.favoriteCount -= 1;
	}

}
