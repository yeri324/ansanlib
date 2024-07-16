package com.ansanlib.book.bookapi.service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLEncoder;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.ansanlib.book.bookapi.dto.BookApiDto;
import com.ansanlib.book.bookapi.dto.BookApiResultDto;
import com.ansanlib.book.bookapi.paging.Criteria;
import com.google.gson.Gson;

@Service
public class BookApiService {
    @Value("${naver.api.clientId}")
    private String clientId;

    @Value("${naver.api.clientSecret}")
    private String clientSecret;

    private static final Logger logger = LoggerFactory.getLogger(BookApiService.class);

    // 페이징 검색
    public BookApiResultDto searchBookNaverAPI(String text, String sortBy, String sortOrder, Criteria criteria) {
        try {
            text = URLEncoder.encode(text, "UTF-8");
        } catch (UnsupportedEncodingException e) {
            throw new RuntimeException("검색어 인코딩 실패", e);
        }

        String apiURL = "https://openapi.naver.com/v1/search/book.json?query=" + text + 
                        "&start=" + criteria.getPageStart() + 
                        "&display=" + criteria.getPerPageNum() +
                        "&sort=sim"; // Default to similarity sort

        logger.info("Requesting Naver API: {}", apiURL);

        Map<String, String> requestHeaders = new HashMap<>();
        requestHeaders.put("X-Naver-Client-Id", clientId);
        requestHeaders.put("X-Naver-Client-Secret", clientSecret);
        String responseBody = get(apiURL, requestHeaders);

        logger.info("Naver API Response: {}", responseBody);

        BookApiResultDto result = stringToClass(responseBody);

        // 서버 측 정렬
        if (result != null && result.getItems() != null) {
            List<BookApiDto> items = result.getItems();
            Comparator<BookApiDto> comparator;

            switch (sortBy) {
                case "title":
                    comparator = Comparator.comparing(BookApiDto::getTitle);
                    break;
                case "author":
                    comparator = Comparator.comparing(BookApiDto::getAuthor);
                    break;
                case "publisher":
                    comparator = Comparator.comparing(BookApiDto::getPublisher);
                    break;
                case "discount":
                    comparator = Comparator.comparing(BookApiDto::getDiscount);
                    break;
                case "pubdate":
                    comparator = Comparator.comparing(BookApiDto::getPubdate);
                    break;
                default:
                    comparator = Comparator.comparing(BookApiDto::getTitle);
            }

            if ("desc".equalsIgnoreCase(sortOrder)) {
                comparator = comparator.reversed();
            }

            items.sort(comparator);
            result.setItems(items);
        }

        return result;
    }

    private static BookApiResultDto stringToClass(String jsonString) {
        Gson gson = new Gson();
        return gson.fromJson(jsonString, BookApiResultDto.class);
    }

    private static String get(String apiUrl, Map<String, String> requestHeaders) {
        HttpURLConnection con = connect(apiUrl);
        try {
            con.setRequestMethod("GET");
            for (Map.Entry<String, String> header : requestHeaders.entrySet()) {
                con.setRequestProperty(header.getKey(), header.getValue());
            }

            int responseCode = con.getResponseCode();
            if (responseCode == HttpURLConnection.HTTP_OK) { // 정상 호출
                return readBody(con.getInputStream());
            } else { // 오류 발생
                return readBody(con.getErrorStream());
            }
        } catch (IOException e) {
            throw new RuntimeException("API 요청과 응답 실패", e);
        } finally {
            con.disconnect();
        }
    }

    private static HttpURLConnection connect(String apiUrl) {
        try {
            URL url = new URL(apiUrl);
            return (HttpURLConnection) url.openConnection();
        } catch (MalformedURLException e) {
            throw new RuntimeException("API URL이 잘못되었습니다. : " + apiUrl, e);
        } catch (IOException e) {
            throw new RuntimeException("연결이 실패했습니다. : " + apiUrl, e);
        }
    }

    private static String readBody(InputStream body) {
        InputStreamReader streamReader = new InputStreamReader(body);

        try (BufferedReader lineReader = new BufferedReader(streamReader)) {
            StringBuilder responseBody = new StringBuilder();

            String line;
            while ((line = lineReader.readLine()) != null) {
                responseBody.append(line);
            }

            return responseBody.toString();
        } catch (IOException e) {
            throw new RuntimeException("API 응답을 읽는 데 실패했습니다.", e);
        }
    }
}
