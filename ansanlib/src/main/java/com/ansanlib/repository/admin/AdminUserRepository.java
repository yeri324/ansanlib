package com.ansanlib.repository.admin;

import org.hibernate.cache.spi.support.AbstractReadWriteAccess.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.querydsl.QuerydslPredicateExecutor;

import com.ansanlib.entity.LibUser;

public interface AdminUserRepository extends JpaRepository<LibUser, Long>,QuerydslPredicateExecutor<LibUser>,AdminUserRepositoryCustom {

}
