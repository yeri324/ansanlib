package com.ansanlib.reservation.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.Reservation;

import jakarta.persistence.EntityNotFoundException;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	List<Reservation> findByLibUser_UserId(Long user_id);
	
	@Query("SELECT r FROM Reservation r " +
	           "WHERE r.bookId = :bookId " +
	           "AND ((r.startDate <= :endDate AND r.endDate >= :startDate) " +
	           "OR (r.startDate BETWEEN :startDate AND :endDate) " +
	           "OR (r.endDate BETWEEN :startDate AND :endDate))")
	List<Reservation> findOverlappingReservations(
			@Param("bookId") Long bookId, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
	
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Reservation r " +
            "WHERE r.bookId = :bookId " +
            "AND ((r.startDate < :endDate AND :endDate < r.endDate) " +
            "OR (r.startDate < :startDate AND :startDate < r.endDate))")
	boolean checkIfOverlappingReservationsExists(
			@Param("bookId") Long bookId, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
    
    List<Reservation> findByLibUser_UserIdOrderByStartDateAsc(Long user_id);

}