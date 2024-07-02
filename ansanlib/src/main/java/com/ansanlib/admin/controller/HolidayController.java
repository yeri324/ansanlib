package com.ansanlib.admin.controller;

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
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.admin.service.HolidayService;
import com.ansanlib.entity.Holiday;

@RestController
@RequestMapping("/api/admin")
public class HolidayController {

    @Autowired
    private HolidayService holidayService;

    @PostMapping("/holiday/new")
    public Holiday createHoliday(@RequestBody Holiday holiday) {
        return holidayService.saveHoliday(holiday);
    }
    
    
    @GetMapping("/holiday/list")
    public ResponseEntity<List<Holiday>> getAllHolidays() {
        List<Holiday> holidays = holidayService.getAllHolidays();
        return new ResponseEntity<>(holidays, HttpStatus.OK);
    }
    
    @DeleteMapping("holiday/{id}")
    public ResponseEntity<String> deleteHoliday(@PathVariable Long id) {
        try {
            holidayService.deleteHolidayById(id);
            return ResponseEntity.ok("Holiday deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to delete holiday");
        }
    }
    
    
}
