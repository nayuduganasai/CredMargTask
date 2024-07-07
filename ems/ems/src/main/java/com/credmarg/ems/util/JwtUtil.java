package com.credmarg.ems.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "06fb8bd6d5a55dacea7ce3d815d9f859591d18e8e7254229f4ccb81cc1ce260d30371053d6fef96dd2642e1203a260d89cb25f2e19475837b2d6b25fdc07ca296b365f16b59c2d1bc68a243bf9a0c73c2744966b22fbcf4ff01707f8fc9c938ce68f886517e1de975b51743f975968e31bba4d626623ce67d0fc515d4a6c18e896311f9071f81f0903756eadee8a1ef1c94cfb9e13020f4edb1fc460dd7859508af36d9bbab40a5385eb78386905cd5b04eab90c168069b96f1c7fb788b404d23e1907070670f6f93332a5c9563ff1098183c475999ce873ca54b800fb59fa591c6b93dbf9e852d6a4cc84cabe30f554eb6c92832561c838dae7d2f001d53560";;

    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10))
                .signWith(SignatureAlgorithm.HS256, SECRET_KEY).compact();
    }

    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }
}
