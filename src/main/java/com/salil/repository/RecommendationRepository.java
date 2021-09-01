package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.salil.entities.Card;

public interface RecommendationRepository extends MongoRepository<Card, String> {

}
