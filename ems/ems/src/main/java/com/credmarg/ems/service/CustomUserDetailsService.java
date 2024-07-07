package com.credmarg.ems.service;

import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.repo.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Admin admin = adminRepository.findByUserEmail(username);
        if (admin == null) {
            throw new UsernameNotFoundException("User not found with email: " + username);
        }
        return org.springframework.security.core.userdetails.User.withUsername(admin.getUserEmail())
                .password(admin.getPassword())
                .roles("ADMIN") // You can set roles/authorities here as needed
                .build();
    }
}
