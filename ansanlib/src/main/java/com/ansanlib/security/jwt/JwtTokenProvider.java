package com.ansanlib.security.jwt;



import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.crypto.SecretKey;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ansanlib.entity.LibUser;
import com.ansanlib.security.CustomUser;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.Keys;


@Component
public class JwtTokenProvider {


    @Autowired
    private JwtProps jwtProps;

    // 토큰 생성
    public String createToken(Long userid, String loginid, List<String> roles) {
        byte[] signingKey = getSigningKey();

        // JWT 토큰 생성
        String jwt = Jwts.builder()
                .signWith(Keys.hmacShaKeyFor(signingKey), Jwts.SIG.HS512)     
                .header()                                                   
                    .add("typ", JwtConstants.TOKEN_TYPE)          
                .and()
                .expiration(new Date(System.currentTimeMillis() + 864000000)) 
                .claim("uno", "" + userid)                              
                .claim("uid", loginid)                                  
                .claim("rol", roles)                                  
                .compact();

        return jwt;
    }


    public UsernamePasswordAuthenticationToken getAuthentication(String authHeader) {
        if(authHeader == null || authHeader.length() == 0 ) 
            return null;

        try {
            String jwt = authHeader.replace(JwtConstants.TOKEN_PREFIX, "");

            //JWT 파싱
            Jws<Claims> parsedToken = Jwts.parser()
                                            .verifyWith(getShaKey())
                                            .build()
                                            .parseSignedClaims(jwt);    

            // 인증된 사용자 번호
            String uno = parsedToken.getPayload().get("uno").toString();
            long userid = ( uno == null ? 0 : Long.parseLong(uno) );

            // 인증된 사용자 아이디
            String loginid = parsedToken.getPayload().get("uid").toString();

            // 인증된 사용자 권한
            Claims claims = parsedToken.getPayload();
            Object roles = claims.get("rol");

            // 토큰에 loginid 있는지 확인
            if( loginid == null || loginid.length() == 0 )
                return null;


            LibUser user = new LibUser();
            user.setUserId(userid);
            user.setLoginid(loginid);
            List<SimpleGrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(user.getRole().toString()));


            UserDetails userDetails = new CustomUser(user);

            return new UsernamePasswordAuthenticationToken(userDetails, null, authorities);

        } catch (ExpiredJwtException exception) {
            System.out.printf("Request to parse expired JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (UnsupportedJwtException exception) {
        	System.out.printf("Request to parse unsupported JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (MalformedJwtException exception) {
        	System.out.printf("Request to parse invalid JWT : {} failed : {}", authHeader, exception.getMessage());
        } catch (IllegalArgumentException exception) {
        	System.out.printf("Request to parse empty or null JWT : {} failed : {}", authHeader, exception.getMessage());
        }

        return null;
    }



  // 토큰 유효성 검사
    public boolean validateToken(String jwt) {
        try {
            // JWT 파싱
	        Jws<Claims> claims = Jwts.parser()
                                    .verifyWith(getShaKey())
                                    .build()
                                    .parseSignedClaims(jwt);  
	        
	        return !claims.getPayload().getExpiration().before(new Date());
	        
	    } catch (ExpiredJwtException exception) {
	    	System.out.println("토큰 만료");
            return false;
        } catch (JwtException exception) {
        	System.out.println("토큰 손상"); 
            return false;
        } catch (NullPointerException exception) {
        	System.out.println("토큰 없음"); 
            return false;
        } catch (Exception e) {
	        return false;
	    }
    }


    // secretKey > signingKey
    private byte[] getSigningKey() {
		return jwtProps.getSecretKey().getBytes();
	}

    // secretKey > (HMAC-SHA algorithms) > signingKey
    private SecretKey getShaKey() {
        return Keys.hmacShaKeyFor(getSigningKey());
    }

    
}
