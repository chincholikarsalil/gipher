package com.salil.entities;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "comments")
public class Comments {

	@Id
	private String cardId;
	private List<CommentDetails> comments;
	
	public Comments() { }

	public String getCardId() {
		return cardId;
	}

	public void setCardId(String cardId) {
		this.cardId = cardId;
	}

	public List<CommentDetails> getComments() {
		return comments;
	}

	public void setComments(List<CommentDetails> comments) {
		this.comments = comments;
	}
	
}
