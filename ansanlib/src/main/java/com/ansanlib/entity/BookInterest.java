package com.ansanlib.entity;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="book_interest")
@Getter @Setter
@NoArgsConstructor
public class BookInterest {
    @Id
    @Column(name="book_interest_id")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_num")
    private Book book; //도서번호

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private LibUser libUser; //사용자아이디

    @CreatedDate
    @Column(updatable = false)
    private LocalDateTime regTime; //지정일

    public BookInterest(Book book, LibUser libUser, LocalDateTime regTime) {
        this.book = book;
        this.libUser = libUser;
        this.regTime = regTime;
    }
}
