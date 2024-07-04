package com.ansanlib.admin.controller;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.admin.dto.HolidayDto;
import com.ansanlib.admin.service.HolidayService;
import com.ansanlib.entity.Holiday;
import com.ansanlib.response.CommonListResponse;

@RestController
@RequestMapping("/api/admin/holiday")
public class HolidayController {

    @Autowired
    private HolidayService holidayService;

    //날짜 도서관 중복체크
    @GetMapping("/check")
    public ResponseEntity<Boolean> checkHoliday(@RequestParam("date") String date, @RequestParam("library") String library) {
        LocalDate localDate = LocalDate.parse(date);
        boolean exists = holidayService.checkHolidayExists(localDate, library);
        return ResponseEntity.ok(exists);
    }
    
    
    //데이터 저장
    @PostMapping("/new")
    public Holiday createHoliday(@RequestBody HolidayDto holidayDto) {
    	System.out.println(holidayDto.getLib_num()+"*"+holidayDto.getLib_name()+"*"+holidayDto.getHoliday()+"*");
        return holidayService.saveHoliday(holidayDto);
    }
    
    
    //데이터 조회
    @GetMapping("/list")
    public ResponseEntity<CommonListResponse<List<Holiday>>> getAllHolidays() {
        List<Holiday> holidays = holidayService.getAllHolidays();
        for(Holiday h : holidays) {
           System.out.println(h.getLibrary().getId());
        }
        return ResponseEntity.ok().body(new CommonListResponse<List<Holiday>>(holidays.size(), holidays));
    }
    
    
    
    
    //데탸삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteHoliday(@PathVariable Long id) {
        try {
            holidayService.deleteHolidayById(id);
            return ResponseEntity.ok("Holiday deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete holiday");
        }
    }
    
    
}
