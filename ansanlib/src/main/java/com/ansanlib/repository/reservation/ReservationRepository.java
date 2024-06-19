package com.ansanlib.repository.reservation;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation, Integer>{
	List<Reservation> findByUserName(String userName);
}
