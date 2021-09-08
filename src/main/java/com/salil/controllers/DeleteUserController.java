package com.salil.controllers;

import java.util.List;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.CommentDetails;
import com.salil.entities.Comments;
import com.salil.entities.User;
import com.salil.entities.UserInterest;
import com.salil.entities.UserPicture;
import com.salil.repository.CommentRepository;
import com.salil.repository.FavoriteRepository;
import com.salil.repository.RecommendationRepository;
import com.salil.repository.UserInterestRepository;
import com.salil.repository.UserPictureRepository;
import com.salil.repository.UserRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class DeleteUserController {

	User user;
	UserPicture userPicture;
	UserInterest userInterest;
	Comments comments;
	List<Comments> commentList;
	List<CommentDetails> commentDetailsList;
	List<String> likedComments;

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserPictureRepository userPictureRepository;
	@Autowired
	UserInterestRepository userInterestRepository;
	@Autowired
	CommentRepository commentRepository;
	@Autowired
	FavoriteRepository favoriteRepository;
	@Autowired
	RecommendationRepository recommendationRepository;

	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

	@PostMapping("/user/delete")
	public String deleteUser(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		this.comments = new Comments();
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			this.userInterest = this.userInterestRepository.findById(json.getString("username")).get();
			if(this.userPictureRepository.existsById(json.getString("username")))
				this.userPicture = this.userPictureRepository.findById(json.getString("username")).get();;
			if(bcrypt.matches(json.getString("delPwd"), this.user.getPassword())) {
				this.userRepository.delete(this.user);
				if(this.userPictureRepository.existsById(json.getString("username")))
					this.userPictureRepository.delete(userPicture);

				this.likedComments = this.userInterest.getCommentsLiked();
				this.commentList = this.commentRepository.findAll();
				for(int i = 0; i < this.commentList.size(); i++) {
					this.commentDetailsList = this.commentList.get(i).getComments();
					for(int j = 0; j < this.commentDetailsList.size(); j++) {
						if(this.likedComments.contains(this.commentDetailsList.get(j).getCommentId())) {
							this.commentDetailsList.get(j).decrLikes();
						}
						if(this.commentDetailsList.get(j).getUsername().equals(json.getString("username"))) {
							this.commentDetailsList.remove(j);
						}
					}
					this.commentList.get(i).setComments(this.commentDetailsList);
					this.commentRepository.save(this.commentList.get(i));
				}

				this.userInterest.getFavorite().forEach((favorite) -> {
					this.favoriteRepository.findAll().forEach((fav) -> {
						if(fav.getId().equals(favorite)) {
							this.favoriteRepository.delete(fav);
						}
					});
				});

				this.userInterest.getRecommended().forEach((recommended) -> {
					this.recommendationRepository.findAll().forEach((card) -> {
						if(card.getId().equals(recommended)) {
							card.decrement();
							if(card.getRecommendCount() < 1) {
								this.recommendationRepository.delete(card);
							} else {
								this.recommendationRepository.save(card);	
							}
						}
					});
				});

				this.userInterestRepository.delete(this.userInterest);
				return "User deleted!";
			}
			return "Passwords don't match!";
		} else {
			return "User not present";
		}
	}
}
