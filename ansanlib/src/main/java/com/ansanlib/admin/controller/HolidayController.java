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
@RequestMapping("/api")
public class HolidayController {

    @Autowired
    private HolidayService holidayService;

    // 날짜 도서관 중복 체크
    @GetMapping("/admin/holiday/check")
    public ResponseEntity<Boolean> checkHoliday(@RequestParam("date") String date, @RequestParam("library") String library) {
        LocalDate localDate = LocalDate.parse(date);
        boolean exists = holidayService.checkHolidayExists(localDate, library);
        return ResponseEntity.ok(exists);
    }

    // 데이터 저장
    @PostMapping("/admin/holiday/new")
    public ResponseEntity<String> createHoliday(@RequestBody HolidayDto holidayDto) {
        try {
            holidayService.saveHoliday(holidayDto);
            return ResponseEntity.ok("휴관일이 성공적으로 추가되었습니다.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // 데이터 조회
    @GetMapping("/holiday/list")
    public ResponseEntity<CommonListResponse<List<Holiday>>> getAllHolidays(@RequestParam(value = "date", required = false) String date) {
        List<Holiday> holidays;

        if (date != null) {
            LocalDate localDate = LocalDate.parse(date);
            holidays = holidayService.getHolidaysByDate(localDate);
        } else {
            holidays = holidayService.getAllHolidays();
        }	

        for (Holiday h : holidays) {
            if (h.getLibrary() != null) {
                System.out.println("Library ID: " + h.getLibrary().getId() + ", Library Name: " + h.getLibrary().getLibName());
            } else {
                System.out.println("Library is null for Holiday with id: " + h.getId());
            }
        }
        return ResponseEntity.ok().body(new CommonListResponse<>(holidays.size(), holidays));
    }

    // 데이터 삭제
    @DeleteMapping("/admin/holiday/{id}")
    public ResponseEntity<String> deleteHoliday(@PathVariable Long id) {
        try {
            holidayService.deleteHolidayById(id);
            return ResponseEntity.ok("Holiday deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete holiday");
        }
    }
}
