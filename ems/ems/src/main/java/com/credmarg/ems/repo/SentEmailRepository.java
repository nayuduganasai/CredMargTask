package com.credmarg.ems.repo;

import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.entity.SentEmails;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SentEmailRepository extends JpaRepository<SentEmails,Long> {
    List<SentEmails> findByAdmin(Admin admin);
}
