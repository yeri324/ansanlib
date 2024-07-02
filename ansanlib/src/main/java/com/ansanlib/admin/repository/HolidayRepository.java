package com.ansanlib.admin.repository;

import com.ansanlib.entity.Holiday;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HolidayRepository extends JpaRepository<Holiday, Long> {
    // You can define custom query methods here if needed
}
