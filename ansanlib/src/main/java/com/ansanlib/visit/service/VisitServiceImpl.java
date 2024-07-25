package com.ansanlib.visit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ansanlib.entity.Visit;
import com.ansanlib.visit.dto.VisitDto;
import com.ansanlib.visit.repository.VisitRepository;

@Service
public class VisitServiceImpl implements VisitService {

	@Autowired
	private VisitRepository visitRepository;

	@Override
	public Visit recordVisit(VisitDto visitDto) {
		Visit visit = new Visit();
		visit.setPage(visitDto.getPage());
		visit.setTimeStamp(LocalDateTime.now());
		return visitRepository.save(visit);
	}

	@Override
	public List<Visit> getAllVisits() {
		return visitRepository.findAll();
	}
	
    @Override
    public long getVisitCount() {
        return visitRepository.count();
    }

    
    @Override
    public long getVisitCountToday() {
        LocalDate today = LocalDate.now();
        LocalDateTime startOfDay = today.atStartOfDay();
        LocalDateTime endOfDay = today.atTime(23, 59, 59);
        return visitRepository.countByTimeStampBetween(startOfDay, endOfDay);
    }
    
    
}