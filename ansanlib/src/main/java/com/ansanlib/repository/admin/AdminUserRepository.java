package com.ansanlib.repository.admin;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.User;

public interface AdminUserRepository extends JpaRepository<User, Long> {

}
