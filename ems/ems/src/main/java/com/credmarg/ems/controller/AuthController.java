package com.credmarg.ems.controller;

import com.credmarg.ems.dto.AuthRequest;
import com.credmarg.ems.dto.AuthResponse;
import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.service.AdminService;
import com.credmarg.ems.service.CustomUserDetailsService;
import com.credmarg.ems.util.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private AdminService adminService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/authenticate")
    public AuthResponse createAuthenticationToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (Exception e) {
            throw new Exception("Incorrect username or password", e);
        }

        final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        final String jwt = jwtUtil.generateToken(userDetails);

        return new AuthResponse(jwt,authRequest.getEmail(),true);
    }

    @PostMapping("/register")
    public Admin registerAdmin(@RequestBody Admin admin) {
        admin.setPassword(passwordEncoder.encode(admin.getPassword()));
        return adminService.createAdmin(admin);
    }
}
