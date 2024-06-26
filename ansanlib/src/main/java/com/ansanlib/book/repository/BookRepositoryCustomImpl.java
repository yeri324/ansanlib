package com.ansanlib.book.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.QBook;
import com.ansanlib.entity.QBookImg;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

public class BookRepositoryCustomImpl implements BookRepositoryCustom{
    
	@Autowired
	private JPAQueryFactory jpaQueryFactory;

    public BookRepositoryCustomImpl(JPAQueryFactory jpaQueryFactory) {
        this.jpaQueryFactory = jpaQueryFactory;
    }

    @Override
    public List<Book> searchBook(BookSearchCondition condition){
        return jpaQueryFactory
                .selectFrom(QBook.book)
                .join(QBook.book.bookImg, QBookImg.bookImg).fetchJoin()
                .where(lossBookException(),
                		bookTitleContains(condition.getTitle()),
                        bookIsbnEq(condition.getIsbn()),
                        bookAuthorEq(condition.getAuthor()),
                        bookPublisherEq(condition.getPublisher()),
                        bookPub_dateEq(condition.getPub_date()),
                        bookCategory_codeEq(condition.getCategory_code()))
                .orderBy(QBook.book.count.desc(), QBook.book.pub_date.desc())
                .fetch();
    }

    @Override
    public Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable){
        List<Book> content = jpaQueryFactory
                .selectFrom(QBook.book)
                .join(QBook.book.bookImg, QBookImg.bookImg).fetchJoin()
                .where(
                        lossBookException(),
                        bookTitleContains(condition.getTitle()),
                        bookIsbnEq(condition.getIsbn()),
                        bookAuthorEq(condition.getAuthor()),
                        bookPublisherEq(condition.getPublisher()),
                        bookPub_dateEq(condition.getPub_date()),
                        bookCategory_codeEq(condition.getCategory_code())
                )
                .orderBy(QBook.book.count.desc(), QBook.book.pub_date.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        long total = jpaQueryFactory
                .select(QBook.book.count())
                .from(QBook.book)
                .where(
                        lossBookException(),
                        bookTitleContains(condition.getTitle()),
                        bookIsbnEq(condition.getIsbn()),
                        bookAuthorEq(condition.getAuthor()),
                        bookPublisherEq(condition.getPublisher()),
                        bookPub_dateEq(condition.getPub_date()),
                        bookCategory_codeEq(condition.getCategory_code())
                )
                .fetchOne();

        return new PageImpl<>(content, pageable, total);
    }


	private BooleanExpression lossBookException(){
        return QBook.book.status.ne(BookStatus.LOSS);
    }
	
	private BooleanExpression bookTitleContains(String title) {
	    return title != null && !title.isEmpty() ? QBook.book.title.contains(title) : null;
	}

	private BooleanExpression bookIsbnEq(String isbn) {
	    return isbn != null && !isbn.isEmpty() ? QBook.book.isbn.eq(isbn) : null;
	}

	private BooleanExpression bookAuthorEq(String author) {
	    return author != null && !author.isEmpty() ? QBook.book.author.eq(author) : null;
	}

	private BooleanExpression bookPublisherEq(String publisher) {
	    return publisher != null && !publisher.isEmpty() ? QBook.book.publisher.eq(publisher) : null;
	}

	private BooleanExpression bookPub_dateEq(LocalDateTime pub_date) {
	    return pub_date != null ? QBook.book.pub_date.eq(pub_date) : null;
	}

	private BooleanExpression bookCategory_codeEq(String category_code) {
	    return category_code != null && !category_code.isEmpty() ? QBook.book.category_code.eq(category_code) : null;
	}
}