package com.ansanlib.user.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.LibUser;



public interface UserRepository extends JpaRepository<LibUser, Long> {

	//아이디체크
	Optional<LibUser> findByLoginid(String loginid);
    //아이디찾기
	Optional<LibUser> findIdByEmailAndName(String email, String name);
	
	//비번찾기
	Optional<LibUser> findByLoginidAndEmail(String loginid, String email);

	boolean existsByLoginid(String loginid);
 
}