package com.eventpage.Security;

import static java.util.Collections.emptyList;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;

import javax.servlet.http.HttpServletRequest;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@Service
public class TokenAuthenticationService {

    static final String SIGNING_KEY = "EventPageBestApp";
    static final String HEADER_STRING = "Authorization";
    public static String userToken = "";
    private static String tokenRole = "";
    private static String tokenUsername = "";


    public static Authentication getAuthentication(HttpServletRequest request) {
        String token = request.getHeader(HEADER_STRING);
        userToken = token;

        if (token != null && !token.isEmpty()) {
            String user = extractUserFromToken(token);
            tokenUsername = user;
            return user != null ? new UsernamePasswordAuthenticationToken(user, null, emptyList()) : null;
        }
        return null;
    }

    public static String extractUserFromToken(String token) {
        if (token != null && !token.isEmpty()) {
            try {
                if (token.split(" ").length > 1) {
                    token = token.split(" ")[1];
                }
                Claims tokenBody = Jwts.parser().setSigningKey(SIGNING_KEY).parseClaimsJws(token).getBody();
                tokenRole = tokenBody.get("role").toString();
                return tokenBody.getSubject();
            } catch (MalformedJwtException ex) {
                ex.printStackTrace();
                return null;
            }
        }
        return null;
    }

    public static boolean isAdmin() {
        String token = extractUserFromToken(JwtTokenUtil.userToken);
        return tokenRole.equals("{authority=ROLE_ADMIN}");
    }

    public static String getTokenUsername() {
        return tokenUsername;
    }
}
