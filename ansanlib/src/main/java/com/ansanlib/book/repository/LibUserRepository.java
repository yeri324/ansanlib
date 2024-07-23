package com.ansanlib.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.LibUser;

@Repository
public interface LibUserRepository extends JpaRepository<LibUser, Long> {
    LibUser findByLoginid(String loginid);
}
