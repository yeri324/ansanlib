package com.ansanlib.repository.user;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.LibUser;

public interface UserRepository extends JpaRepository<LibUser, Long>{

	LibUser findByEmail(String email);



}
