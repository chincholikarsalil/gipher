package com.ibm.wave15.team7.entities;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

	@Id
	private String username;
	private String name;
	private String email;
	private String password;
	private String dob;
	private String mobileNumber;
	private String joinedOn;
	
	public User() { }
	
	public User(String username, String name, String email, String password, String dob, String mobileNumber, String joinedOn) {
		this.username = username;
		this.name = name;
		this.email = email;
		this.password = password;
		this.dob = dob;
		this.mobileNumber = mobileNumber;
		this.joinedOn = joinedOn;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}
	
	public String getJoinedOn() {
		return joinedOn;
	}

	public void setJoinedOn(String joinedOn) {
		this.joinedOn = joinedOn;
	}
	
}
