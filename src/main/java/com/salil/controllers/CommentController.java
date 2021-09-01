package com.salil.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.Card;
import com.salil.entities.Comment;
import com.salil.repository.CommentRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class CommentController {

	Card card;
	Comment comment;
	CommentRepository repository;
	
	public CommentController(CommentRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/all-comments/{cardId}")
	public Comment comments(@PathVariable String cardId) {
		if(this.repository.existsById(cardId))
			return this.repository.findById(cardId).get();
		else
			return null;
	}

	@PostMapping("/comment/add")
	public void addComment(@RequestBody String comment) {
		JSONObject json = new JSONObject(comment);
		if(!this.repository.existsById(json.getString("id"))) {
			this.comment = new Comment(json.getString("id"));
			
			List<String> temp = new ArrayList<String>();
			temp.add(json.getString("comments"));
			
			this.comment.setComments(temp);
			
			this.repository.insert(this.comment);
		} else {
			this.comment = this.repository.findById(json.getString("id")).get();
			
			List<String> temp = this.comment.getComments();
			temp.add(json.getString("comments"));
			
			this.comment.setComments(temp);
			
			this.repository.save(this.comment);
		}
	}

	@PostMapping("/comment/delete")
	public void deleteComment(@RequestBody String comment) {
		JSONObject json = new JSONObject(comment);
		if(this.repository.existsById(json.getString("id"))) {
			this.comment = this.repository.findById(json.getString("id")).get();
			
			List<String> temp = this.comment.getComments();

			temp.remove(Integer.parseInt(json.getString("comments")));

			if(temp.size() > 0) {
				this.comment.setComments(temp);
				this.repository.save(this.comment);				
			} else {
				this.repository.deleteById(json.getString("id"));
			}
		}
	}

}
