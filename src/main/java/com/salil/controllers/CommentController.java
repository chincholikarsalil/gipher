package com.salil.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.Card;
import com.salil.entities.CommentDetails;
import com.salil.entities.Comments;
import com.salil.entities.UserInterest;
import com.salil.repository.CommentRepository;
import com.salil.repository.UserInterestRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class CommentController {

	Card card;
	Comments comments;
	CommentDetails commentDetails;
	UserInterest userInterest;
	CommentRepository repository;
	UserInterestRepository userInterestRepository;

	public CommentController(CommentRepository repository, UserInterestRepository userInterestRepository) {
		this.repository = repository;
		this.userInterestRepository = userInterestRepository;
	}

	@GetMapping("/all-comments/{cardId}")
	public Comments comments(@PathVariable String cardId) {
		if(this.repository.existsById(cardId))
			return this.repository.findById(cardId).get();
		else
			return null;
	}
	
	@GetMapping("/user/interest/comment/all/{username}")
	public List<String> userLikedComments(@PathVariable String username) {
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			return this.userInterest.getCommentsLiked();
		} else {
			return new ArrayList<String>();
		}
	}

	@PostMapping("/comment/add")
	public void addComment(@RequestBody String comments) {
		JSONObject json = new JSONObject(comments);
		JSONArray cmnt = json.getJSONArray("comments");

		this.commentDetails = new CommentDetails();
		this.commentDetails.setCommentId(cmnt.getJSONObject(0).getString("commentId"));
		this.commentDetails.setUsername(cmnt.getJSONObject(0).getString("username"));
		this.commentDetails.setComment(cmnt.getJSONObject(0).getString("comment"));
		this.commentDetails.setLikes(cmnt.getJSONObject(0).getInt("likes"));

		if(!this.repository.existsById(json.getString("cardId"))) {
			this.comments = new Comments();
			this.comments.setCardId(json.getString("cardId"));

			List<CommentDetails> temp = new ArrayList<CommentDetails>();
			temp.add(this.commentDetails);

			this.comments.setComments(temp);

			this.repository.insert(this.comments);
		} else {
			this.comments = this.repository.findById(json.getString("cardId")).get();

			List<CommentDetails> temp = this.comments.getComments();
			temp.add(this.commentDetails);

			this.comments.setComments(temp);

			this.repository.save(this.comments);
		}
	}

	@PostMapping("/comment/delete")
	public void deleteComment(@RequestBody String comment) {
		JSONObject json = new JSONObject(comment);
		if(this.repository.existsById(json.getString("cardId"))) {
			this.comments = this.repository.findById(json.getString("cardId")).get();
			
			List<CommentDetails> temp = this.comments.getComments();

			for(int i = 0; i < temp.size(); i++) {
				if(temp.get(i).getCommentId().equals(json.getString("comments"))) {
					temp.remove(i);
				}
			}

			if(temp.size() > 0) {
				this.comments.setComments(temp);
				this.repository.save(this.comments);				
			} else {
				this.repository.deleteById(json.getString("cardId"));
			}
		}
	}
	
	@PostMapping("/comment/like")
	public void likeComment(@RequestBody String comment) {
		JSONObject json = new JSONObject(comment);
		if(this.repository.existsById(json.getString("cardId"))) {
			this.comments = this.repository.findById(json.getString("cardId")).get();
			
			List<CommentDetails> temp = this.comments.getComments();

			for(int i = 0; i < temp.size(); i++) {
				if(temp.get(i).getCommentId().equals(json.getString("comments"))) {
					temp.get(i).incrLikes();
				}
			}

			if(temp.size() > 0) {
				this.comments.setComments(temp);
				this.repository.save(this.comments);				
			} else {
				this.repository.deleteById(json.getString("cardId"));
			}
		}
	}
	
	@PostMapping("/user/interest/comment/like")
	public List<String> userInterestLikeComment(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String commentId = json.getString("commentId");
		
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(!this.userInterest.getCommentsLiked().contains(commentId)) {
				this.userInterest.getCommentsLiked().add(commentId);
				this.userInterestRepository.save(this.userInterest);
			}
		}

		return this.userInterest.getCommentsLiked();
	}
	
	@PostMapping("/comment/dislike")
	public void dislikeComment(@RequestBody String comment) {
		JSONObject json = new JSONObject(comment);
		if(this.repository.existsById(json.getString("cardId"))) {
			this.comments = this.repository.findById(json.getString("cardId")).get();
			
			List<CommentDetails> temp = this.comments.getComments();

			for(int i = 0; i < temp.size(); i++) {
				if(temp.get(i).getCommentId().equals(json.getString("comments"))) {
					temp.get(i).decrLikes();
				}
			}

			if(temp.size() > 0) {
				this.comments.setComments(temp);
				this.repository.save(this.comments);				
			} else {
				this.repository.deleteById(json.getString("cardId"));
			}
		}
	}
	
	@PostMapping("/user/interest/comment/dislike")
	public List<String> userInterestDislikeComment(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String commentId = json.getString("commentId");
		
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(this.userInterest.getCommentsLiked().contains(commentId)) {
				this.userInterest.getCommentsLiked().remove(commentId);
				this.userInterestRepository.save(this.userInterest);
			}
		}

		return this.userInterest.getCommentsLiked();
	}

}
