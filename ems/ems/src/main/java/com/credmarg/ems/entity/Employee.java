package com.credmarg.ems.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Employee {
    @Id
    private String email;
    private String name;
    private String designation;
    private double ctc;

    @ManyToOne
    private Admin admin;
}
