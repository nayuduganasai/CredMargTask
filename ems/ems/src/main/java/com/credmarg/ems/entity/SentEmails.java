package com.credmarg.ems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class SentEmails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String email;
    private String message;

    @ManyToOne
    private Admin admin;

    public SentEmails(String email, String message, Admin admin) {
        this.email = email;
        this.message = message;
        this.admin = admin;
    }
}
