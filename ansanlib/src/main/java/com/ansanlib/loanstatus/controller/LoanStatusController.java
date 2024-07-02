package com.ansanlib.loanstatus.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LoanStatus;
import com.ansanlib.loanstatus.dto.LoanStatusDto;
import com.ansanlib.loanstatus.service.LoanStatusService;


@RestController
@RequestMapping("/api/loanstatus")
public class LoanStatusController {
	
	@Autowired
	private LoanStatusService loanStatusService;
	
	@GetMapping("get/by-user/{userId}")
	public List<LoanStatusDto> getLoanStatusByUserId(@PathVariable Long userId){
		List<LoanStatus> loanStatusList = loanStatusService.getLoanStatusByUserId(userId);
		List<LoanStatusDto> loanStatusDtoList = loanStatusList.stream().map(LoanStatusDto::new).toList();
		return loanStatusDtoList;
	}

}