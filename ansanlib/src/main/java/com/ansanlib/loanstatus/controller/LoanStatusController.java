package com.ansanlib.loanstatus.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.LoanStatus;
import com.ansanlib.loanstatus.dto.LoanStatusDto;
import com.ansanlib.loanstatus.service.LoanService;
import com.ansanlib.loanstatus.service.LoanStatusService;
import com.ansanlib.security.user.CustomUser;
import com.ansanlib.user.service.UserService;

import jakarta.servlet.http.HttpServletRequest;


@RestController
@RequestMapping("/api/loanstatus")
public class LoanStatusController {
	
	@Autowired
	private LoanStatusService loanStatusService;
	
    @Autowired
    private LoanService loanService;
	
	
	@Autowired
	private UserService userService;
	
	@GetMapping("/get")
	public ResponseEntity<?> getLoanStatusByUser(@AuthenticationPrincipal CustomUser user,
			HttpServletRequest httpRequest) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		List<LoanStatus> loanStatus = loanStatusService.getLoanStatusByUserId(userId);
		List<LoanStatusDto> loanStatusDto = loanStatus.stream().map(LoanStatusDto::new).toList();
		if(loanStatusDto.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		return ResponseEntity.ok(loanStatusDto);
	}
	
	@GetMapping("/get_name")
	public ResponseEntity<?> getName(@AuthenticationPrincipal CustomUser user) {
		if(user == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Not Logged in.");
		}
		long userId = user.getUser().getUserId();
		try {
			LibUser fullLibUser = userService.select(userId);
			String realName = fullLibUser.getName();
			return ResponseEntity.ok(realName);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		}
	}
	
	//그래프

	  @GetMapping("/weekly")
	    public ResponseEntity<List<Map<String, Object>>> getWeeklyLoanCounts() {
	        List<Map<String, Object>> loanCounts = loanService.getWeeklyLoanCounts();
	        return ResponseEntity.ok(loanCounts);
	    }
}
