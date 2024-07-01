package com.ansanlib.loanstatus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.admin.repository.LoanStatusRepository;
import com.ansanlib.entity.LoanStatus;

@Service
public class LoanService {
	
	@Autowired
	private LoanStatusRepository loanStatusRepository;
	
	public List<LoanStatus> getLoanStatusByUserId(Long userId){
		return loanStatusRepository.findByLibuserId(userId);
	}
	
}	