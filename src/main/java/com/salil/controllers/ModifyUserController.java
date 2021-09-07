package com.salil.controllers;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.salil.entities.User;
import com.salil.repository.UserRepository;

@Controller
@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class ModifyUserController {

	User user;
	@Autowired
	UserRepository userRepository;;

	@PostMapping("/user/delete")
	public String deleteUser(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(this.user.getPassword().equals(json.getString("delPwd"))) {
				this.userRepository.delete(this.user);
				return "User deleted!";
			} else {
				return "Passwords don't match!";
			}
		}
		return "Error";
	}
	
	@PostMapping("user/edit/details")
	public User editUserDetails(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(this.user.getPassword().equals(json.getString("password"))) {
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
	
	@PostMapping("user/edit/password")
	public User editUserPassword(@RequestBody String user) {
		JSONObject json = new JSONObject(user);
		if(this.userRepository.existsById(json.getString("username"))) {
			this.user = this.userRepository.findById(json.getString("username")).get();
			if(this.user.getPassword().equals(json.getString("password"))) {
				this.user.setPassword(json.getString("newPassword"));
				this.userRepository.save(this.user);
				return this.user;
			} else {
				return null;
			}
		}
		return null;
	}
}
