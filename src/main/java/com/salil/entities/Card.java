package com.salil.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "recommended")
public class Card {

	@Id
	private String id;
	private String title;
	private String imgUrl;
	private Boolean recommend;

	public Card(String id, String title, String imgUrl) {
		super();
		this.id = id;
		this.title = title;
		this.imgUrl = imgUrl;
		this.recommend = false;
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

	public Boolean getRecommend() {
		return recommend;
	}

	public void setRecommend(Boolean recommend) {
		this.recommend = recommend;
	}

}
