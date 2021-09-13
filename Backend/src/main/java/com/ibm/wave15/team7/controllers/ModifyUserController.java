package com.ibm.wave15.team7.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.wave15.team7.entities.User;
import com.ibm.wave15.team7.entities.UserPicture;
import com.ibm.wave15.team7.repository.UserPictureRepository;
import com.ibm.wave15.team7.repository.UserRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class ModifyUserController {

	User user;
	UserPicture userPicture;

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserPictureRepository userPictureRepository;

	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();


	@PostMapping("/user/edit/details")
	public User editUserDetails(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(bcrypt.matches(json.getString("password"), this.user.getPassword())) {
				this.user.setName(json.getString("name"));
				this.user.setDob(json.getString("dob"));
				this.user.setMobileNumber(json.getString("mobileNumber"));
				this.userRepository.save(this.user);
				return this.user;
			} else {
				return null;
			}
		}
		return null;
	}

	@PostMapping("/user/edit/password")
	public User editUserPassword(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(bcrypt.matches(json.getString("password"), this.user.getPassword())) {
				this.user.setPassword(bcrypt.encode(json.getString("newPassword")));
				this.userRepository.save(this.user);
				return this.user;
			} else {
				return null;
			}
		}
		return null;
	}

	@PostMapping("/user/edit/picture")
	public UserPicture editUserPicture(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userPictureRepository.existsById(json.getString("username"))) {
			this.userPicture = this.userPictureRepository.findById(json.getString("username")).get();
			this.userPicture.setName(json.getString("name"));
			this.userPicture.setImage(json.getString("image"));
			this.userPictureRepository.save(this.userPicture);
		} else {
			this.userPicture = new UserPicture();
			this.userPicture.setUsername(json.getString("username"));
			this.userPicture.setName(json.getString("name"));
			this.userPicture.setImage(json.getString("image"));
			this.userPictureRepository.insert(this.userPicture);
		}
		return this.userPicture;
	}

}
