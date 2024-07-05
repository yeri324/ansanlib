//package com.ansanlib.admin.service;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.ansanlib.admin.dto.AdminBookDto;
//import com.ansanlib.book.repository.BookRepository;
//import com.ansanlib.entity.Book;
//import com.ansanlib.library.LibraryRepository;
//
//@Service
//public class AdminBookService {
//
//    @Autowired
//    private BookRepository bookRepository;
//
//    @Autowired
//    private LibraryRepository libraryRepository;
//
//    public Book saveBook(AdminBookDto adminBookDto) {
//    //    Library lib = libraryRepository.findByLibNum(adminBookDto.getLib_num());
//
//        Book book = new Book();
//        book.setIsbn(adminBookDto.getIsbn());
//        book.setTitle(adminBookDto.getTitle());
//        book.setAuthor(adminBookDto.getAuthor());
//        book.setPublisher(adminBookDto.getPublisher());
//        book.setPub_date(adminBookDto.getPub_date());
//        book.setCategory_code(adminBookDto.getCategory_code());
//        book.setLocation(adminBookDto.getLocation());
//        book.setBookDetail(adminBookDto.getBookDetail());
//      //  book.setLib_name(adminBookDto.getLib_name());
//        book.setCount(adminBookDto.getCount());
//        book.setStatus(adminBookDto.getStatus());
//      //  book.setLibrary(lib); // Assuming a relationship exists
//
//        return bookRepository.save(book);
//    }
//}
