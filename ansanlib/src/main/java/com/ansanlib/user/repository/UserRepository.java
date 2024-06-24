package com.ansanlib.user.repository;

import java.awt.print.Pageable;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.LibUser;



public interface UserRepository extends JpaRepository<LibUser, Long> {

	Page<LibUser> findByEmailContaining(String email, org.springframework.data.domain.Pageable pageable);

	Optional<LibUser> findByLoginid(String loginid);

	Optional<LibUser> findByEmail(String email);

	 // 기존 메소드들
	
	
//    Optional<LibUser> findByEmail(String email);
//
//    
//    Page<LibUser> findByNameContaining(String searchString, Pageable pageable);
//    Page<LibUser> findByEmailContaining(String email, Pageable pageable);
//    
//   
//   Optional<LibUser> findByLoginid( String loginid);
//    
//    Optional<LibUser> findByLoginidAndName(String loginid, String name);
   
}
