package com.ansanlib.reservation.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.ansanlib.entity.Reservation;

import jakarta.transaction.Transactional;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long>{
	@Query("SELECT r from Reservation r WHERE r.libUser.userId = :userId")
	List<Reservation> findByUserId(long userId);
	
	Reservation findById(long reservationId);
	
	@Query("SELECT r FROM Reservation r " +
	           "WHERE r.bookId.id = :bookId " +
	           "AND ((r.startDate <= :endDate AND r.endDate >= :startDate) " +
	           "OR (r.startDate BETWEEN :startDate AND :endDate) " +
	           "OR (r.endDate BETWEEN :startDate AND :endDate))")
	List<Reservation> findOverlappingReservations(
			@Param("bookId") Long bookId, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
	
	   @Query("SELECT CASE WHEN COUNT(r) > 0 THEN true ELSE false END " +
	            "FROM Reservation r " +
	            "WHERE r.bookId.id = :bookId " +
	            "AND (r.startDate <= :endDate AND r.endDate >= :startDate)")
   boolean checkIfOverlappingReservationsExists(
         @Param("bookId") Long bookId, 
            @Param("startDate") LocalDateTime startDate, 
            @Param("endDate") LocalDateTime endDate);
	   
	@Transactional
	@Modifying
	@Query("DELETE FROM Reservation r WHERE r.libUser.userId = :userId AND r.id = :reservationId")
	int deleteBookBelongsTo(@Param("reservationId") Long reservationId, @Param("userId") Long userId);

    
    List<Reservation> findByLibUser_UserIdOrderByStartDateAsc(Long user_id);
    List<Reservation> findBybookId_Id(Long id);
    
    @Modifying
    @Transactional
    @Query("DELETE FROM Reservation r WHERE r.libUser.userId = :userId")
    void deleteByLibUserId(@Param("userId") Long userId);
}

