package com.ansanlib.controller.board;

import org.springframework.stereotype.Controller;

import com.ansanlib.service.board.BoardService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class BoardController {

	private final BoardService boardService;
}
