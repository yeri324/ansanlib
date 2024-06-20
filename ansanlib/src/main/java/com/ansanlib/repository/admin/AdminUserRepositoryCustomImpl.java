package com.ansanlib.repository.admin;

import java.util.ArrayList;
import java.util.List;

import org.thymeleaf.util.StringUtils;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.QLibUser;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import jakarta.persistence.EntityManager;

public class AdminUserRepositoryCustomImpl implements AdminUserRepositoryCustom {
	private JPAQueryFactory queryFactory;
	
	public AdminUserRepositoryCustomImpl(EntityManager em) {
		this.queryFactory = new JPAQueryFactory(em);
	}


	@Override
	public List<LibUser>  AdminUserList(AdminUserDto adminUserDto) {
		QLibUser libUser = QLibUser.libUser;
		var query = queryFactory.selectFrom(libUser);
		

        if ("userId".equals(adminUserDto.getSearchBy())) {
            query.where(libUser.loginid.containsIgnoreCase(adminUserDto.getSearchQuery()));
        } else if ("userName".equals(adminUserDto.getSearchBy())) {
            query.where(libUser.name.containsIgnoreCase(adminUserDto.getSearchQuery()));
        }

  
		if ("penalty".equals(adminUserDto.getSelectRadio())) {
			query.where(libUser.penalty.gt(0)).orderBy(libUser.penalty.desc());
			}
		else if ("latefee".equals(adminUserDto.getSelectRadio())) {
			query.where(libUser.lateFee.gt(0));
		}
		
		List<LibUser> users = new ArrayList<>();
		users = query.fetch();
		return users;
		
	}
	

}
