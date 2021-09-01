package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.salil.entities.Comment;

public interface CommentRepository extends MongoRepository<Comment, String> {

}
