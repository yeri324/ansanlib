package com.ansanlib.book.repository;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Primary;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import com.ansanlib.book.dto.BookSearchCondition;
import com.ansanlib.constant.BookStatus;
import com.ansanlib.entity.Book;
import com.ansanlib.entity.QBook;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@Repository
@Primary
@RequiredArgsConstructor
public class BookRepositoryCustomImpl implements BookRepositoryCustom {

    private final JPAQueryFactory jpaQueryFactory;
    private static final Logger logger = LoggerFactory.getLogger(BookRepositoryCustomImpl.class);

    @Override
    public Page<Book> searchBookPageSimple(BookSearchCondition condition, Pageable pageable) {
        logger.debug("Search condition: {}", condition);

        QBook book = QBook.book;

        BooleanBuilder whereClause = new BooleanBuilder();

        // Status가 'LOSS'가 아닌 경우를 필터링
        whereClause.and(lossBookException());
        logger.debug("Status condition: LOSS");

        // 동적 검색 조건
        if (StringUtils.hasText(condition.getTitle())) {
            whereClause.and(bookTitleContainsIgnoreCase(condition.getTitle()));
            logger.debug("Title condition: {}", condition.getTitle());
        }

        if (StringUtils.hasText(condition.getIsbn())) {
            whereClause.and(bookIsbnEq(condition.getIsbn()));
            logger.debug("ISBN condition: {}", condition.getIsbn());
        }

        if (StringUtils.hasText(condition.getAuthor())) {
            whereClause.and(bookAuthorEq(condition.getAuthor()));
            logger.debug("Author condition: {}", condition.getAuthor());
        }
        if (StringUtils.hasText(condition.getPublisher())) {
            whereClause.and(bookPublisherEq(condition.getPublisher()));
            logger.debug("Publisher condition: {}", condition.getPublisher());
        }
        if (StringUtils.hasText(condition.getPub_date())) {
            whereClause.and(bookPubDateEq(condition.getPub_date()));
            logger.debug("Pub_date condition: {}", condition.getPub_date());
        }
        if (StringUtils.hasText(condition.getCategory_code())) {
            whereClause.and(bookCategoryCodeEq(condition.getCategory_code()));
            logger.debug("Category_code condition: {}", condition.getCategory_code());
        }

        // 쿼리 실행
        List<Book> content = jpaQueryFactory
                .selectFrom(book)
                .where(whereClause)
                .orderBy(book.count.desc(), book.pub_date.desc())
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        // 전체 레코드 수 조회
        long total = jpaQueryFactory
                .select(book.count())
                .from(book)
                .where(whereClause)
                .fetchOne();

        logger.debug("Total records: {}", total);

        return new PageImpl<>(content, pageable, total);
    }

    // 조건 메서드
    private BooleanExpression lossBookException() {
        return QBook.book.status.ne(BookStatus.LOSS);
    }

    private BooleanExpression bookTitleContainsIgnoreCase(String title) {
        return title != null && !title.isEmpty() ? QBook.book.title.lower().like("%" + title.toLowerCase() + "%") : null;
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

    private BooleanExpression bookPubDateEq(String pubDate) {
        return pubDate != null && !pubDate.isEmpty() ? QBook.book.pub_date.eq(pubDate) : null;
    }

    private BooleanExpression bookCategoryCodeEq(String categoryCode) {
        return categoryCode != null && !categoryCode.isEmpty() ? QBook.book.category_code.eq(categoryCode) : null;
    }
}