package com.credmarg.ems.repo;

import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee,String> {
    Employee findByEmail(String email);
    void deleteByEmail(String email);
    @Query("SELECT e FROM Employee e WHERE e.admin.userEmail = :adminEmail")
    List<Employee> findEmployeesByAdminEmail(@Param("adminEmail") String adminEmail);
}
