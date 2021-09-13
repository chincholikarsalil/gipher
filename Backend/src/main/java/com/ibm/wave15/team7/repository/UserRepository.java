package com.ibm.wave15.team7.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.ibm.wave15.team7.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
