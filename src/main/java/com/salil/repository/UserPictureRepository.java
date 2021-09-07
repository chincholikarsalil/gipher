package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.UserPicture;

@Repository
public interface UserPictureRepository extends MongoRepository<UserPicture, String> {

}
