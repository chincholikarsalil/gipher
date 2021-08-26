package com.salil.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class RecommendationController {
	
	Card card;
	List<Card> cardArray = new ArrayList<Card>();

	@GetMapping("/all-cards")
	public List<Card> cards() {
		return this.cardArray;
	}

	@PostMapping("/card/recommend")
	public void recommend(@RequestBody Card card) {
		if(!this.cardArray.contains(card)) {
			this.cardArray.add(card);
		}
	}
	
	@DeleteMapping("/card/unrecommend/{id}")
	public void unrecommend(@PathVariable String id) {
		for(int i = 0; i < this.cardArray.size(); i++) {
			if(this.cardArray.get(i).getId().equals(id)) {
				this.cardArray.remove(i);
			}
		}
	}

}
