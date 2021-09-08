package com.salil.controllers;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.CardFav;
import com.salil.entities.UserInterest;
import com.salil.repository.FavoriteRepository;
import com.salil.repository.UserInterestRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class FavoriteController {

	CardFav card;
	UserInterest userInterest;
	List<CardFav> cardArray = new ArrayList<CardFav>();

	@Autowired
	FavoriteRepository repository;
	@Autowired
	UserInterestRepository userInterestRepository;

	@GetMapping("/favorite/all-cards")
	public List<CardFav> cards() {
		return this.repository.findAll();
	}

	@GetMapping("/user/interest/card/favorite/all/{username}")
	public List<String> allFavoriteCards(@PathVariable String username) {
		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			return this.userInterest.getFavorite();
		} else {
			return new ArrayList<String>();
		}
	}

	@PostMapping("/card/favorite")
	public void favorite(@RequestBody CardFav card) {	
		if(!this.repository.existsById(card.getId())) {
			this.repository.insert(card);
		}
	}

	@PostMapping("/user/interest/card/favorite")
	public List<String> userFavorite(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String cardId = json.getString("cardId");

		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(!this.userInterest.getFavorite().contains(cardId)) {
				this.userInterest.getFavorite().add(cardId);
				this.userInterestRepository.save(this.userInterest);
			}
		}

		return this.userInterest.getFavorite();
	}

	@PostMapping("/card/unfavorite")
	public void unfavorite(@RequestBody CardFav card) {
		if(this.repository.existsById(card.getId())) {
			this.repository.deleteById(card.getId());
		}
	}

	@PostMapping("/user/interest/card/unfavorite")
	public List<String> userUnfavorite(@RequestBody String details) {
		JSONObject json = new JSONObject(details);
		String username = json.getString("username");
		String cardId = json.getString("cardId");

		if(this.userInterestRepository.existsById(username)) {
			this.userInterest = this.userInterestRepository.findById(username).get();
			if(this.userInterest.getFavorite().contains(cardId)) {
				this.userInterest.getFavorite().remove(cardId);
				this.userInterestRepository.save(this.userInterest);
			}
		}
		return this.userInterest.getFavorite();
	}
}
