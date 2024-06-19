package com.ansanlib.repository.user;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.LibUser;

public interface UserRepository extends JpaRepository<LibUser, Long>{

	LibUser findByEmail(String email);



}
