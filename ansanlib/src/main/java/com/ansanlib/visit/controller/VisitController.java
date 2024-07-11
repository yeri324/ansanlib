package com.ansanlib.visit.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ansanlib.entity.Visit;
import com.ansanlib.visit.dto.VisitDto;
import com.ansanlib.visit.service.VisitService;

@RestController
@RequestMapping("/api/visits")
@Validated
public class VisitController {

	@Autowired
	private VisitService visitService;

	@PostMapping
	public Visit recordVisit(@RequestBody VisitDto visitDto) {
		return visitService.recordVisit(visitDto);
	}

	@GetMapping
	public List<Visit> getAllVisits() {
		return visitService.getAllVisits();
	}
	
    @GetMapping("/count")
    public long getVisitCount() {
        return visitService.getVisitCount();
    }
	
}