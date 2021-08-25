package com.salil.controller;

public class Card {

	private String id;
	private String title;
	private String imgUrl;
	private Boolean recommend;

	public Card(String title, String imgUrl) {
		super();
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

	@Override
	public String toString() {
		return "<b>ID:</b> "+ id + "<br><b>Title:</b> " + title + "<br><img src='" + imgUrl + "' width=200px height=100px /><br><b>Recommend:</b> " + recommend;
	}
}
