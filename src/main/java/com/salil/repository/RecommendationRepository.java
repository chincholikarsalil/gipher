package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.Card;

@Repository
public interface RecommendationRepository extends MongoRepository<Card, String> {

}
