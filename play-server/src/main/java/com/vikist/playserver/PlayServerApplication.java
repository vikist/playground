package com.vikist.playserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class PlayServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlayServerApplication.class, args);
	}
}
