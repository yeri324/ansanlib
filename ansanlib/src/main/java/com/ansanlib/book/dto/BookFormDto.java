package com.ansanlib.book.dto;

import java.time.LocalDateTime;

import org.modelmapper.ModelMapper;

import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter @Setter
public class BookFormDto {

	private Long id;

    @NotBlank(message = "책이름은 필수 입력 값입니다.")
    private String title;

    @NotBlank(message = "ISBN은 필수 입력 값입니다.")
    private String isbn;

    @NotBlank(message = "저자는 필수 입력 값입니다.")
    private String author;

    @NotBlank(message = "출판사는 필수 입력 값입니다.")
    private String publisher;
    
    @NotNull(message = "출판년도는 필수 입력 값입니다.")
    private LocalDateTime pub_date;
    
    private String bookDetail;
    
    private BookStatus status;

    private String location;
    
    private BookImgDto bookImgDto;

    private Long bookImgId;

    private static ModelMapper modelMapper = new ModelMapper();

    public Book createBook(){
        return modelMapper.map(this, Book.class);
    }

    public static BookFormDto of(Book book){
        return modelMapper.map(book, BookFormDto.class);
    }
}

