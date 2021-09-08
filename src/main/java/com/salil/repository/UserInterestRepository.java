package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.UserInterest;

@Repository
public interface UserInterestRepository extends MongoRepository<UserInterest, String> {

}
