package com.ansanlib.loanstatus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LoanStatus;
import com.ansanlib.loanstatus.service.LoanService;


@RestController
@RequestMapping("/api/loan")
public class LoanController {
	
	@Autowired
	private LoanService loanService;
	
	@GetMapping("get/by-user/{userId}")
	public List<LoanStatus> getLoanStatusByUserId(@PathVariable Long userId){
		return loanService.getLoanStatusByUserId(userId);
	}

}