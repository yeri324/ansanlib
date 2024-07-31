package com.ansanlib.loanstatus.service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.admin.repository.LoanStatusRepository;

@Service
public class LoanServiceImpl implements LoanService {

    @Autowired
    private LoanStatusRepository loanStatusRepository;

    @Override
    public List<Map<String, Object>> getWeeklyLoanCounts() {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(6);

        List<Object[]> results = loanStatusRepository.findLoanCountByDateRange(startDate, endDate);

        return results.stream()
                .map(result -> {
                    Map<String, Object> map = new HashMap<>();
                    map.put("date", result[0].toString());
                    map.put("count", ((Number) result[1]).intValue());
                    return map;
                })
                .collect(Collectors.toList());
    }
}
