package com.ansanlib.board.controller;

import org.springframework.stereotype.Controller;

import com.ansanlib.board.service.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
}
