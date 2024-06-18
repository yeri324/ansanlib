package com.ansanlib.repository.admin;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.thymeleaf.util.StringUtils;

import com.ansanlib.dto.admin.user.AdminUserDto;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.QLibUser;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class AdminUserRepositoryCustomImpl implements AdminUserRepositoryCustom {
	private JPAQueryFactory queryFactory;

	@Override
	public Page<LibUser>  AdminUserList(AdminUserDto adminUserDto, Pageable pageable) {
		QLibUser libUser = QLibUser.libUser;
		var query = queryFactory
				.selectFrom(QLibUser.libUser)
				.where(searchByLike( adminUserDto.getSearchBy(), adminUserDto.getSearchQuery()));
		if(adminUserDto.getSelectRadio().equals("penalty")) query.where(libUser.penalty.gt(0));
		else if(adminUserDto.getSelectRadio().equals("lateFee")) query.where(libUser.lateFee.gt(0));
		else if(adminUserDto.getSelectRadio().equals("all")) query.where(libUser.lateFee.gt(0));
				
		 List<LibUser> userlist = query.fetch();
		 long total = query.fetchCount();
		 return new PageImpl<>(userlist, pageable,total);
		
	}
	
	private BooleanExpression searchByLike(String searchBy, String searchQuery) {
		if (StringUtils.equals("ById", searchBy)) {
			return QLibUser.libUser.loginid.like("%" + searchQuery + "%");
		} else if (StringUtils.equals("ByName", searchBy)) {
			return QLibUser.libUser.createdBy.like("%" + searchQuery + "%");
		}
		return null;
	}

}
