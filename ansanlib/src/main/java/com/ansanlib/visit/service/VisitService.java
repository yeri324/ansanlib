package com.ansanlib.visit.service;

import java.util.List;

import com.ansanlib.entity.Visit;
import com.ansanlib.visit.dto.VisitDto;

public interface VisitService {
	
    Visit recordVisit(VisitDto visitDto);
    List<Visit> getAllVisits();
    long getVisitCount();
}
