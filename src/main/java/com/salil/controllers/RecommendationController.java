package com.salil.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import com.salil.entities.Card;
import com.salil.entities.UserInterest;
import com.salil.repository.RecommendationRepository;
import com.salil.repository.UserInterestRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class RecommendationController {
	
	Card card;
	UserInterest userInterest;
	List<Card> cardArray = new ArrayList<Card>();
	
	@Autowired
	RecommendationRepository repository;
	@Autowired
	UserInterestRepository userInterestRepository;

	@GetMapping("/recommended/all-cards")
	public List<Card> cards() {
		return this.repository.findAll();
	}
	
	@GetMapping("/user/interest/card/recommend/all/{username}")
	public List<String> allLikedCards(@PathVariable String username) {
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			return this.userInterest.getRecommended();
		} else {
			return new ArrayList<String>();
		}
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
	
	@PostMapping("/user/interest/card/recommend")
	public List<String> userRecommend(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String cardId = json.getString("cardId");
		
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(!this.userInterest.getRecommended().contains(cardId)) {
				this.userInterest.getRecommended().add(cardId);
				this.userInterestRepository.save(this.userInterest);
			}
		}

		return this.userInterest.getRecommended();
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
	
	@PostMapping("/user/interest/card/unrecommend")
	public List<String> userUnrecommend(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String cardId = json.getString("cardId");
		
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(this.userInterest.getRecommended().contains(cardId)) {
				this.userInterest.getRecommended().remove(cardId);
				this.userInterestRepository.save(this.userInterest);
			}
		}
		return this.userInterest.getRecommended();
	}

}
