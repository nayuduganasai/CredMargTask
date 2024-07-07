package com.credmarg.ems.repo;

import com.credmarg.ems.entity.Vendor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VendorRepository extends JpaRepository<Vendor,String> {
    Vendor findByEmail(String email);
    void deleteByEmail(String email);

    @Query("SELECT v FROM Vendor v WHERE v.admin.userEmail = :adminEmail")
    List<Vendor> findVendorsByAdminEmail(@Param("adminEmail") String adminEmail);

    @Query("SELECT v.email FROM Vendor v WHERE v.admin.userEmail = :adminEmail")
    List<String> findEmailsByAdminEmail(@Param("adminEmail") String adminEmail);
}
