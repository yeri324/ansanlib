package com.ansanlib.admin.service;

import java.lang.reflect.InvocationTargetException;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.admin.dto.AdminDetailUserDto;
import com.ansanlib.admin.dto.AdminUserDto;
import com.ansanlib.admin.repository.AdminUserRepository;
import com.ansanlib.admin.repository.LoanStatusRepository;
import com.ansanlib.entity.LibUser;
import com.ansanlib.entity.LoanStatus;
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
	private final LoanStatusRepository loanStatusRepository;
	

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
		return reservationRepository.findByLibUser_UserIdOrderByStartDateAsc(adminDetailUserDto.getId());
	}
	
	@Transactional(readOnly = true) 
	public List<LoanStatus> getLoanStatus(AdminDetailUserDto adminDetailUserDto) {
		return loanStatusRepository.findByLibuser_UserIdOrderByLoanStart(adminDetailUserDto.getId());
	}
	
	
	public LibUser updateUserStatus(AdminDetailUserDto adminDetailUserDto) throws IllegalAccessException, InvocationTargetException {
		LibUser user = adminUserRepository.findById(adminDetailUserDto.getId()).orElseThrow(EntityNotFoundException::new);
		user.libUserToPenalty();
		return adminUserRepository.save(user);
		
	}
	
	public void cancelRes(Long id) {
		 reservationRepository.deleteById(id);
	}
	public void returnBook(Long id) {
		 loanStatusRepository.deleteById(id);
	}

	@Transactional(readOnly = true) 
	public List<Reservation> getBookRes(AdminDetailUserDto adminDetailUserDto) {
		return reservationRepository.findBybookId_Id(adminDetailUserDto.getId());
	}
	
	public LibUser payLateFee(AdminDetailUserDto adminDetailUserDto) throws IllegalAccessException, InvocationTargetException {
		LibUser user = adminUserRepository.findById(adminDetailUserDto.getId()).orElseThrow(EntityNotFoundException::new);
		user.payLateFee();
		return adminUserRepository.save(user);
		
	}

}
