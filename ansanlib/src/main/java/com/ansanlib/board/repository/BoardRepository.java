package com.ansanlib.board.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.ansanlib.entity.Board;

public interface BoardRepository extends JpaRepository<Board, Long>{

}
