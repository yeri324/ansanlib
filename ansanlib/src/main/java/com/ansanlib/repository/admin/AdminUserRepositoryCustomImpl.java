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
		
		
		if (adminUserDto.getSelectRadio().equals("penalty")) {
			query.where(libUser.penalty.gt(0));
			}
		else if (adminUserDto.getSelectRadio().equals("lateFee")) {
			query.where(libUser.lateFee.gt(0));
		}
		query.where(searchByLike(adminUserDto.getSearchBy(),adminUserDto.getSearchQuery()));
		List<LibUser> users = new ArrayList<>();
		users = query.fetch();
		return users;
		
	}
	
	private BooleanExpression searchByLike(String searchBy, String searchQuery) {
		if (StringUtils.equals("userId", searchBy)) {
			return QLibUser.libUser.loginid.contains(searchQuery);
		} else if (StringUtils.equals("userName", searchBy)) {
			return QLibUser.libUser.name.contains(searchQuery);
		}
		return null;
	}

}
