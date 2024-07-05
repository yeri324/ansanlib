package com.ansanlib.loanstatus.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.admin.repository.LoanStatusRepository;
import com.ansanlib.entity.LoanStatus;

import jakarta.transaction.Transactional;

@Service
public class LoanStatusService {

	@Autowired
	private LoanStatusRepository loanStatusRepository;

	public List<LoanStatus> getLoanStatusByUserId(Long userId) {
		return loanStatusRepository.findByLibuserId(userId);
	}
	@Transactional
    public void deleteLoanStatusByUserId(Long userId) {
        loanStatusRepository.deleteByLibUserId(userId);
    }
}