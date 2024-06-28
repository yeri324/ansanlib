package com.ansanlib.book.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.constant.Role;
import com.ansanlib.entity.LibUser;

public interface LibUserRepository extends JpaRepository<LibUser, Long>{

	LibUser findByEmail(String email);

    Page<LibUser> findByRoleAndEmailContaining(Role role, String title, Pageable pageable);

    Long countByRole(Role role);

    List<LibUser> findByRole(Role role);
}
