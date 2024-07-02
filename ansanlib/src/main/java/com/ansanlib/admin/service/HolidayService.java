package com.ansanlib.admin.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.admin.repository.HolidayRepository;
import com.ansanlib.entity.Holiday;

@Service
public class HolidayService {

    @Autowired
    private HolidayRepository holidayRepository;

    public Holiday saveHoliday(Holiday holiday) {
        return holidayRepository.save(holiday);
    }
    
    public List<Holiday> getAllHolidays() {
    	return holidayRepository.findAll();
    }
    
    
    @Transactional
    public void deleteHolidayById(Long id) {
        Optional<Holiday> holidayOptional = holidayRepository.findById(id);
        if (holidayOptional.isPresent()) {
            Holiday holiday = holidayOptional.get();
            holidayRepository.delete(holiday);
        } else {
            throw new IllegalArgumentException("Holiday not found with id: " + id);
        }
    }
    
}
