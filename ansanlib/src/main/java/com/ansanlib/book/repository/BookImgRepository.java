package com.ansanlib.book.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.ansanlib.entity.BookImg;

public interface BookImgRepository extends JpaRepository<BookImg, Long>{

	@Modifying
    @Transactional
    @Query("UPDATE BookImg b SET b.imgUrl = :imgUrl WHERE b.id = :id")
    void updateImgUrl(@Param("id") Long id, @Param("imgUrl") String imgUrl);
}
