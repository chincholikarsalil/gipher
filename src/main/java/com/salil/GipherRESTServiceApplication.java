package com.salil;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.salil.repository.CommentRepository;
import com.salil.repository.RecommendationRepository;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = {RecommendationRepository.class, CommentRepository.class})
public class GipherRESTServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GipherRESTServiceApplication.class, args);
	}
	
}
