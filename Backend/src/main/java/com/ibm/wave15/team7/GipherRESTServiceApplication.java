package com.ibm.wave15.team7;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.ibm.wave15.team7.repository.CommentRepository;
import com.ibm.wave15.team7.repository.RecommendationRepository;

@SpringBootApplication
@EnableMongoRepositories(basePackageClasses = {RecommendationRepository.class, CommentRepository.class})
public class GipherRESTServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(GipherRESTServiceApplication.class, args);
	}
	
}
