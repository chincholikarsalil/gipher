package com.salil.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.salil.entities.Card;
import com.salil.repository.RecommendationRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class RecommendationController {
	
	Card card;
	List<Card> cardArray = new ArrayList<Card>();
	RecommendationRepository repository;
	
	public RecommendationController(RecommendationRepository repository) {
		this.repository = repository;
	}

	@GetMapping("/all-cards")
	public List<Card> cards() {
		return this.repository.findAll();
	}

	@PostMapping("/card/recommend")
	public void recommend(@RequestBody Card card) {
		if(!this.repository.existsById(card.getId())) {
			card.increment();
			this.repository.insert(card);
		} else {
			Card temp = this.repository.findById(card.getId()).get();
			temp.increment();
			this.repository.save(temp);
		}
	}
	
	@PostMapping("/card/unrecommend")
	public void unrecommend(@RequestBody Card card) {
		if(this.repository.existsById(card.getId())) {
			Card temp = this.repository.findById(card.getId()).get();
			if(temp.getRecommendCount() > 1) {
				temp.decrement();
				this.repository.save(temp);
			} else {
				this.repository.deleteById(card.getId());
			}
		}
	}

}
