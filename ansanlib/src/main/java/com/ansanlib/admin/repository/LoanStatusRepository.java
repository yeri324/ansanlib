package com.ansanlib.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.LoanStatus;
import com.ansanlib.entity.Reservation;

public interface LoanStatusRepository extends JpaRepository<LoanStatus, Long> {
	List<LoanStatus> findByLibuser_UserIdOrderByLoanStart(Long user_id);
}
