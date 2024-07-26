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

    // 데이터 중복 체크 (도서관 이름, 날짜)
    public boolean checkHolidayExists(LocalDate date, String libraryName) {
        boolean exists = holidayRepository.existsByHolidayAndLibrary_LibName(date, libraryName);
        System.out.println("Checking if holiday exists for date: " + date + " and library: " + libraryName + " - Result: " + exists);
        return exists;
    }

    // 데이터 저장
    public Holiday saveHoliday(HolidayDto holidayDto) {
        System.out.println("Finding library by libNum: " + holidayDto.getLib_num());
        Library lib = libraryRepository.findByLibNum(holidayDto.getLib_num());
        if (lib == null) {
            throw new IllegalArgumentException("해당 도서관이 존재하지 않습니다: " + holidayDto.getLib_num());
        }
        System.out.println("Found library: " + lib.getLibName());

        System.out.println("Checking if holiday exists for date: " + holidayDto.getHoliday() + " and library: " + holidayDto.getLib_name());
        if (!checkHolidayExists(holidayDto.getHoliday(), holidayDto.getLib_name())) {
            Holiday holiday = new Holiday();
            holiday.setLibrary(lib);
            holiday.setLib_name(holidayDto.getLib_name());
            holiday.setHoliday(holidayDto.getHoliday());

            System.out.println("Saving holiday: " + holidayDto.getHoliday() + " for library: " + holidayDto.getLib_name());
            Holiday savedHoliday = holidayRepository.save(holiday);
            System.out.println("Saved holiday with ID: " + savedHoliday.getId());
            return savedHoliday;
        } else {
            throw new IllegalArgumentException("해당 날짜에 이미 휴관일이 등록되어 있습니다: " + holidayDto.getHoliday());
        }
    }

    // 데이터 조회
    public List<Holiday> getAllHolidays() {
        return holidayRepository.findAll();
    }

    // 데이터 삭제
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

    public List<Holiday> getHolidaysByDate(LocalDate date) {
        return holidayRepository.findByHoliday(date);
    }
}
