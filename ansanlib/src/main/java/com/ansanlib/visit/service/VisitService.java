package com.ansanlib.visit.service;

import java.util.List;

import com.ansanlib.entity.Visit;
import com.ansanlib.visit.dto.VisitDto;

public interface VisitService {
	
    Visit recordVisit(VisitDto visitDto);
    List<Visit> getAllVisits();
    long getVisitCountToday(); // 오늘의 방문자 수를 계산하는 메서드
    long getVisitCount();
}