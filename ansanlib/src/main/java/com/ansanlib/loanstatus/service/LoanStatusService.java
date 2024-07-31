package com.ansanlib.loanstatus.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

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
	
    //회원 탈퇴 관련
	@Transactional
    public void deleteLoanStatusByUserId(Long userId) {
        loanStatusRepository.deleteByLibUserId(userId);
    }

	
	
	


	    public List<Map<String, Object>> getWeeklyLoanCounts() {
	        LocalDateTime endDate = LocalDateTime.now();
	        LocalDateTime startDate = endDate.minusDays(6);

	        List<Object[]> results = loanStatusRepository.findLoanCountByDateRange(startDate, endDate);
	        Map<String, Long> dateCountMap = results.stream()
	            .collect(Collectors.groupingBy(
	                row -> ((LocalDateTime) row[0]).toLocalDate().toString(),
	                Collectors.summingLong(row -> (Long) row[1])
	            ));

	        return IntStream.rangeClosed(0, 6)
	            .mapToObj(i -> startDate.plusDays(i).toLocalDate().toString())
	            .map(date -> {
	                Map<String, Object> map = new HashMap<>();
	                map.put("date", date);
	                map.put("count", dateCountMap.getOrDefault(date, 0L));
	                return map;
	            })
	            .collect(Collectors.toList());
	    }
	}

	
	
	
	
	
	
	
	
