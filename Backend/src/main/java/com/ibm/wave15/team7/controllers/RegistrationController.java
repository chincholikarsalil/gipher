package com.ibm.wave15.team7.controllers;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ibm.wave15.team7.entities.User;
import com.ibm.wave15.team7.entities.UserInterest;
import com.ibm.wave15.team7.repository.UserInterestRepository;
import com.ibm.wave15.team7.repository.UserRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class RegistrationController {

	User user;
	UserInterest userInterest;

	@Autowired
	UserRepository userRepository;
	@Autowired
	UserInterestRepository userInterestRepository;

	DateFormat fmt = new SimpleDateFormat("yyyy-MM-dd");
	DateFormat showFmt = new SimpleDateFormat("dd-MMM-yyyy");

	BCryptPasswordEncoder bcrypt = new BCryptPasswordEncoder();
	
	@PostMapping("/user/register")
	public ResponseEntity<String> register(@RequestBody String user) throws JSONException, ParseException {
		JSONObject json = new JSONObject(user);

		if(!this.userRepository.existsById(json.getString("username"))) {
			this.user = new User();
			this.user.setUsername(json.getString("username"));
			this.user.setName(json.getString("name"));
			this.user.setEmail(json.getString("email"));
			this.user.setMobileNumber(json.getString("mobileNumber"));
			this.user.setPassword(bcrypt.encode(json.getString("password")));
			this.user.setDob(json.getString("dob"));
			this.user.setJoinedOn(json.getString("joinedOn"));
			this.userRepository.insert(this.user);

			this.userInterest = new UserInterest();
			this.userInterest.setUsername(this.user.getUsername());
			this.userInterestRepository.insert(this.userInterest);

			return new ResponseEntity<String>("username: " + this.user.getUsername(), HttpStatus.CREATED);
		} else {
			return new ResponseEntity<String>("Username already exists", HttpStatus.CONFLICT);
		}
	}
}
