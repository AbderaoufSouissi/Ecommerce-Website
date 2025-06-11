package com.ars.ecomm_api.auth.helper;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;


import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Optional;

@Slf4j
@Component
public class JwtTokenHelper {

    @Value("${jwt.auth.app}")
    private String appName;

    @Value("${jwt.auth.secret_key}")
    private String secretkey;

    @Value("${jwt.auth.expires_in}")
    private int expiresIn;

    public String generateToken(String username) {
        if (!StringUtils.hasText(username)) {
            throw new IllegalArgumentException("Username cannot be null or empty");
        }

        return Jwts.builder()
                .issuer(appName)
                .subject(username)
                .issuedAt(new Date())
                .expiration(generateExpirationDate())
                .signWith(getSigningKey())
                .compact();
    }

    private SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretkey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    private Date generateExpirationDate() {
        return new Date(System.currentTimeMillis() + expiresIn * 1000L);
    }

    public String getToken(HttpServletRequest request) {
        String authHeader = getAuthHeaderFromHeader(request);
        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            return authHeader.substring(7);
        }
        return authHeader;
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        if (!StringUtils.hasText(token) || userDetails == null) {
            return false;
        }

        try {
            Optional<String> username = getUsernameFromToken(token);
            return username.isPresent()
                    && username.get().equals(userDetails.getUsername())
                    && !isTokenExpired(token);
        } catch (JwtException | IllegalArgumentException e) {
            log.warn("Token validation failed: {}", e.getMessage());
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expirationDate = getExpirationDate(token);
        return expirationDate != null && expirationDate.before(new Date());
    }

    private Date getExpirationDate(String token) {
        try {
            final Claims claims = getAllClaimsFromToken(token);
            return claims.getExpiration();
        } catch (Exception e) {
            log.debug("Could not extract expiration date: {}", e.getMessage());
            return null;
        }
    }

    private String getAuthHeaderFromHeader(HttpServletRequest request) {
        return request.getHeader("Authorization");
    }

    public Optional<String> getUsernameFromToken(String authToken) {
        try {
            final Claims claims = this.getAllClaimsFromToken(authToken);
            return Optional.ofNullable(claims.getSubject());
        } catch (Exception e) {
            log.debug("Failed to get username from token: {}", e.getMessage());
            return Optional.empty();
        }
    }

    private Claims getAllClaimsFromToken(String authToken) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(authToken)
                .getPayload();
    }
}
