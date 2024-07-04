package com.ansanlib.admin.service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.admin.dto.HolidayDto;
import com.ansanlib.admin.repository.HolidayRepository;
import com.ansanlib.entity.Holiday;
import com.ansanlib.entity.Library;
import com.ansanlib.library.LibraryRepository;


@Service
public class HolidayService {
    @Autowired
    private HolidayRepository holidayRepository;
    @Autowired
    private LibraryRepository libraryRepository;

    
    
    //데이터 중복체크  (도서관, 날짜)
    public boolean checkHolidayExists(LocalDate date, String libraryName) {
        return holidayRepository.existsByHolidayAndLibrary_LibName(date, libraryName);
    }
    
    //데이터 저장
    public Holiday saveHoliday(HolidayDto holidayDto) {
    	Library lib =libraryRepository.findByLibNum(holidayDto.getLib_num());
    	
    	Holiday holiday = new Holiday();
		holiday.setLibrary(lib);
		holiday.setLib_name(holidayDto.getLib_name());
		holiday.setHoliday(holidayDto.getHoliday());
		return holidayRepository.save(holiday);
        
    }
    
   
    
    //데이터 조회
    public List<Holiday> getAllHolidays() {
    	return holidayRepository.findAll();
    }
    
    
    //데이터 삭제
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
