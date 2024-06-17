package com.ansanlib.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
@Table(name="LoanStatus")
public class LoanStatus extends BaseEntity {

      @Id
      @Column(name="Loan_num")
      @GeneratedValue(strategy= GenerationType.AUTO)
      private Long id;
      
      @Column(nullable=false)
      private LocalDateTime loan_start;
      
      @Column(nullable=false)
      private LocalDateTime loan_end;
      
      
}
