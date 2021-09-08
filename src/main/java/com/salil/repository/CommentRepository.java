package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.Comments;

@Repository
public interface CommentRepository extends MongoRepository<Comments, String> {

}
