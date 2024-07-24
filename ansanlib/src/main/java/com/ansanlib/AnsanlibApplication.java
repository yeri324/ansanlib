package com.ansanlib;

import org.springframework.boot.SpringApplication;


import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class AnsanlibApplication {

	public static void main(String[] args) {
		SpringApplication.run(AnsanlibApplication.class, args);
	}

}
