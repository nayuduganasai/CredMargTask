package com.credmarg.ems.dto;

import com.credmarg.ems.entity.Admin;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Data
public class AuthResponse {

    private final String jwt;
    private final String email;
    private final Boolean isLoggedIn;

}

