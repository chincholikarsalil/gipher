package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

}
