package com.ansanlib.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.admin.dto.AdminDetailUserDto;
import com.ansanlib.admin.dto.AdminUserDto;
import com.ansanlib.admin.repository.AdminUserRepository;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.Reservation;
import com.ansanlib.reservation.repository.ReservationRepository;

import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional

public class AdminUserService {
	private final AdminUserRepository adminUserRepository;
	private final ReservationRepository reservationRepository;

	public List<LibUser> ListUser(AdminUserDto adminUserDto) {
		return adminUserRepository.AdminUserList(adminUserDto);
	}
	
	public List<LibUser> getUserList() {
		return adminUserRepository.findAll();
	}

	@Transactional(readOnly = true) 
	public LibUser getUserById(AdminDetailUserDto adminDetailUserDto) {
		return adminUserRepository.findById(adminDetailUserDto.getId()).orElseThrow(EntityNotFoundException::new);
		
	}
	@Transactional(readOnly = true) 
	public List<Reservation> getReservation(AdminDetailUserDto adminDetailUserDto) {
		return reservationRepository.findByLibUser_userId(adminDetailUserDto.getId());
	}
	
	
}
