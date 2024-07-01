package com.ansanlib.admin.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.ansanlib.entity.LoanStatus;

public interface LoanStatusRepository extends JpaRepository<LoanStatus, Long> {
	List<LoanStatus> findByLibuser_UserIdOrderByLoanStart(Long user_id);

	 @Query("SELECT l FROM LoanStatus l WHERE l.libuser.id = :userId ORDER BY l.loanStart")
	 List<LoanStatus> findByLibuserId(@Param("userId")Long userId);
}
