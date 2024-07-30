package com.ansanlib.visit.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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
    
    
    @Override
    public List<Map<String, Object>> getWeeklyVisits() {
        LocalDateTime endDate = LocalDateTime.now();
        LocalDateTime startDate = endDate.minusDays(6);

        List<Map<String, Object>> visits = visitRepository.findByTimeStampBetween(startDate, endDate).stream()
            .collect(Collectors.groupingBy(
                visit -> visit.getTimeStamp().toLocalDate(),
                Collectors.counting()
            ))
            .entrySet().stream()
            .map(entry -> {
                Map<String, Object> map = new HashMap<>();
                map.put("date", entry.getKey().toString());
                map.put("count", entry.getValue());
                return map;
            })
            .sorted((e1, e2) -> LocalDate.parse(e1.get("date").toString()).compareTo(LocalDate.parse(e2.get("date").toString())))
            .collect(Collectors.toList());

        // Ensure all 7 days are present
        for (int i = 6; i >= 0; i--) {
            LocalDate date = endDate.toLocalDate().minusDays(i);
            boolean exists = visits.stream().anyMatch(visit -> visit.get("date").equals(date.toString()));
            if (!exists) {
                Map<String, Object> map = new HashMap<>();
                map.put("date", date.toString());
                map.put("count", 0L);
                visits.add(map);
            }
        }

        // Sort again after adding missing dates
        visits.sort((e1, e2) -> LocalDate.parse(e1.get("date").toString()).compareTo(LocalDate.parse(e2.get("date").toString())));

        return visits;
    
    
    }
    
}