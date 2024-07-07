package com.credmarg.ems.repo;

import com.credmarg.ems.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<Admin,Long> {
    Admin findByUserEmail(String userEmail);
}
