package com.credmarg.ems.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Vendor {
    @Id
    private String email;
    private String name;
    private String upi;

    @ManyToOne
    private Admin admin;

}
