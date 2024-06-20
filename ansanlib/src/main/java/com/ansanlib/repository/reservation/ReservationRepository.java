package com.ansanlib.repository.reservation;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.Reservation;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	List<Reservation> findByUserId(String userId);
	
	@Query("SELECT r FROM Reservation r " +
	           "WHERE r.bookIsbn = :bookIsbn " +
	           "AND ((r.startDate <= :endDate AND r.endDate >= :startDate) " +
	           "OR (r.startDate BETWEEN :startDate AND :endDate) " +
	           "OR (r.endDate BETWEEN :startDate AND :endDate))")
	List<Reservation> findOverlappingReservations(
			@Param("bookIsbn") String bookIsbn, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
	
    @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
            "FROM Reservation r " +
            "WHERE r.bookIsbn = :bookIsbn " +
            "AND ((r.startDate < :endDate AND :endDate < r.endDate) " +
            "OR (r.startDate < :startDate AND :startDate < r.endDate))")
	boolean checkIfOverlappingReservationsExists(
			@Param("bookIsbn") String bookIsbn, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
}