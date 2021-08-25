package com.salil.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class RecommendationController {
	
	List<Card> cardArray = new ArrayList<Card>();
	
	@GetMapping("/")
	public String display() {
		String page = 
				"<h1>Welcome</h1>"
				+ "<br>"
				+ "<p>This is Gipher backend</p>";
		return page;
	}

	@GetMapping("/cards")
	public List<Card> getArray() {
		return this.cardArray;
	}

	@PostMapping("/cards")
	public void postArray(@RequestBody Card card) {
		if(!this.cardArray.contains(card)) {
			this.cardArray.add(card);
		}
	}
	
	@DeleteMapping("/cards/delete/{id}")
	public void deleteArray(@PathVariable String id) {
		for(int i = 0; i < this.cardArray.size(); i++) {
			if(this.cardArray.get(i).getId().equals(id)) {
				this.cardArray.remove(i);
			}
		}
	}

}
