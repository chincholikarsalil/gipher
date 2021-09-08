package com.ibm.wave15.team7.entities;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userInterests")
public class UserInterest {

	@Id
	private String username;
	private List<String> recommended;
	private List<String> favorite;
	private List<String> commentsLiked;
	
	public UserInterest(String username, List<String> recommended, List<String> favorite, List<String> commentsLiked) {
		this.username = username;
		this.recommended = recommended;
		this.favorite = favorite;
		this.commentsLiked = commentsLiked;
	}

	public UserInterest() {
		this.recommended = new ArrayList<String>();
		this.favorite = new ArrayList<String>();
		this.commentsLiked = new ArrayList<String>();
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<String> getRecommended() {
		return recommended;
	}

	public void setRecommended(List<String> recommended) {
		this.recommended = recommended;
	}

	public List<String> getFavorite() {
		return favorite;
	}

	public void setFavorite(List<String> favorite) {
		this.favorite = favorite;
	}

	public List<String> getCommentsLiked() {
		return commentsLiked;
	}

	public void setCommentsLiked(List<String> commentsLiked) {
		this.commentsLiked = commentsLiked;
	}

}
