package com.ansanlib.visit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.admin.service.AdminPageService;
import com.ansanlib.entity.Popup;
import com.ansanlib.entity.Visit;
import com.ansanlib.visit.dto.VisitDto;
import com.ansanlib.visit.service.VisitService;

@RestController
@RequestMapping("/api")
@Validated
public class VisitController {

	@Autowired
	private VisitService visitService;
	
	@Autowired
	private AdminPageService adminPageService;

	@PostMapping("/visits")
	public Visit recordVisit(@RequestBody VisitDto visitDto) {
		return visitService.recordVisit(visitDto);
	}

	@GetMapping("/visits")
	public List<Visit> getAllVisits() {
		return visitService.getAllVisits();
	}
	
    @GetMapping("/visits/count")
    public long getVisitCount() {
        return visitService.getVisitCount();
    }
    
    @GetMapping("/popup/home")
	public ResponseEntity<List<Popup>> homePopupList(){
		return adminPageService.homePopupList();
	}
    
    @GetMapping("/visits/today")
    public long getVisitCountToday() {
        return visitService.getVisitCountToday();
    }
    
    
    
	
}