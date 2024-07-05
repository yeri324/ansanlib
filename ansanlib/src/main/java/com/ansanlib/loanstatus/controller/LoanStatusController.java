package com.ansanlib.loanstatus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LoanStatus;
import com.ansanlib.loanstatus.dto.LoanStatusDto;
import com.ansanlib.loanstatus.service.LoanStatusService;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/loanstatus")
public class LoanStatusController {
	
	@Autowired
	private LoanStatusService loanStatusService;
	
	@Autowired
	private UserService userService;
	
	@GetMapping("get/by-user/{userId}")
	public ResponseEntity<List<LoanStatusDto>> getLoanStatusByUserId(@PathVariable Long userId, HttpServletRequest httpRequest) {
	    if (httpRequest.getSession().getAttribute("userId") == null || !userService.existsById(userId)) {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	    }
		List<LoanStatus> loanStatusList = loanStatusService.getLoanStatusByUserId(userId);
		List<LoanStatusDto> loanStatusDtoList = loanStatusList.stream().map(LoanStatusDto::new).toList();
		return ResponseEntity.ok(loanStatusDtoList);
	}

}