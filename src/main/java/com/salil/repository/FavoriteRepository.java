package com.salil.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.salil.entities.CardFav;

@Repository
public interface FavoriteRepository extends MongoRepository<CardFav, String> {

}
