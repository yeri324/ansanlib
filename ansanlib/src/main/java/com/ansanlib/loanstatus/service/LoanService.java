package com.ansanlib.loanstatus.service;

import java.util.List;
import java.util.Map;

public interface LoanService {
    List<Map<String, Object>> getWeeklyLoanCounts();
}
