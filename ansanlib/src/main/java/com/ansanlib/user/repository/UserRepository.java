package com.ansanlib.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.LibUser;

public interface UserRepository extends JpaRepository<LibUser, Long> {
	Optional<LibUser> findByLoginid(String loginid);
}
