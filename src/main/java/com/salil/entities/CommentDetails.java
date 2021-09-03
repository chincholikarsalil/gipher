package com.salil.entities;

public class CommentDetails {
	String commentId;
	String comment;
	int likes;
	
	public CommentDetails() {
		this.likes = 0;
	}

	public String getCommentId() {
		return commentId;
	}

	public void setCommentId(String commentId) {
		this.commentId = commentId;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public int getLikes() {
		return likes;
	}
	
	public void setLikes(int likes) {
		this.likes = likes;
	}

	public void incrLikes() {
		this.likes += 1;
	}
	
	public void decrLikes() {
		this.likes -= 1;
	}

}
