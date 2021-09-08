package com.salil.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.User;
import com.salil.entities.UserPicture;
import com.salil.repository.UserPictureRepository;
import com.salil.repository.UserRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class LoginController {

	User user;
	UserPicture userPicture;
	@Autowired
	UserRepository userRepository;
	@Autowired
	UserPictureRepository userPictureRepository;
	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();

	@PostMapping("/user/login")
	public User login(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(bcrypt.matches(json.getString("password"), this.user.getPassword())) {
				return this.user;
			} else {
				return null;
			}
		} else {
			return null;
		}
	}
	
	@PostMapping("/user/login/picture")
	public UserPicture getUserPicture(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userPictureRepository.existsById(json.getString("username"))) {
			this.userPicture = this.userPictureRepository.findById(json.getString("username")).get();
			return this.userPicture;
		}
		return null;
	}
}
