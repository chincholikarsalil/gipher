package com.salil.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "userPicture")
public class UserPicture {
	
	@Id
	private String username;
	private String name;
	private String image;

	public UserPicture(String username, String name, String image) {
		this.username = username;
		this.name = name;
		this.image = image;
	}
	
	public UserPicture() {}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}
	
}
