package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.salil.entities.Comments;

public interface CommentRepository extends MongoRepository<Comments, String> {

}
