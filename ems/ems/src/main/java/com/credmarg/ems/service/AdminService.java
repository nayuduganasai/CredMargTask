package com.credmarg.ems.service;

import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.entity.Employee;
import com.credmarg.ems.entity.SentEmails;
import com.credmarg.ems.entity.Vendor;
import com.credmarg.ems.repo.AdminRepository;
import com.credmarg.ems.repo.EmployeeRepository;
import com.credmarg.ems.repo.SentEmailRepository;
import com.credmarg.ems.repo.VendorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final EmployeeRepository employeeRepository;
    private final VendorRepository vendorRepository;
    private final AdminRepository adminRepository;
    private final SentEmailRepository sentEmailRepository;

    @Autowired
    public AdminService(EmployeeRepository employeeRepository, VendorRepository vendorRepository, AdminRepository adminRepository, SentEmailRepository sentEmailRepository) {
        this.employeeRepository = employeeRepository;
        this.vendorRepository = vendorRepository;
        this.adminRepository = adminRepository;
        this.sentEmailRepository = sentEmailRepository;
    }

    // Employee methods
    public Employee createEmployee(Employee employee, String adminEmail) {
        Admin admin = adminRepository.findByUserEmail(adminEmail);
        employee.setAdmin(admin);
        return employeeRepository.save(employee);
    }

    public Employee updateEmployee(String email, Employee updatedEmployee) {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee != null) {
            employee.setName(updatedEmployee.getName());
            employee.setDesignation(updatedEmployee.getDesignation());
            employee.setCtc(updatedEmployee.getCtc());
            employeeRepository.save(employee);
        }
        return employee;
    }

    @Transactional
    public void deleteEmployee(String email) {
        employeeRepository.deleteByEmail(email);
    }

    public List<Employee> getAllEmployees(String adminEmail) {
        return employeeRepository.findEmployeesByAdminEmail(adminEmail);
    }

    // Vendor methods
    public Vendor createVendor(Vendor vendor, String adminEmail) {
        Admin admin = adminRepository.findByUserEmail(adminEmail);
        vendor.setAdmin(admin);
        return vendorRepository.save(vendor);
    }

    public Vendor updateVendor(String email, Vendor updatedVendor) {
        Vendor vendor = vendorRepository.findByEmail(email);
        if (vendor != null) {
            vendor.setName(updatedVendor.getName());
            vendor.setUpi(updatedVendor.getUpi());
            vendorRepository.save(vendor);
        }
        return vendor;
    }

    @Transactional
    public void deleteVendor(String email) {

        vendorRepository.deleteByEmail(email);
    }

    public List<Vendor> getAllVendors(String adminEmail) {
        return vendorRepository.findVendorsByAdminEmail(adminEmail);
    }

    // Email methods
    public void sendEmailToVendors(List<String> vendorEmails, String adminMail) {
        Admin admin = adminRepository.findByUserEmail(adminMail);
        for (String email : vendorEmails) {
            Vendor vendor = vendorRepository.findById(email).orElse(null);
            if (vendor != null) {
                String message = String.format("Sending payments to vendor %s at UPI %s", vendor.getName(), vendor.getUpi());
                SentEmails sentEmail = new SentEmails(email, message, admin);
                sentEmailRepository.save(sentEmail);
                System.out.println(message); // Mock email sending
            }
        }
    }

    public List<String> getVendorEmailsByAdminEmail(String adminEmail) {
        return vendorRepository.findEmailsByAdminEmail(adminEmail);
    }

    public List<SentEmails> getSentEmails(String adminMail) {
        Admin admin = adminRepository.findByUserEmail(adminMail);
        return sentEmailRepository.findByAdmin(admin);
    }

    // Admin methods
    public Admin createAdmin(Admin admin) {
        return adminRepository.save(admin);
    }

    public Admin findByEmail(String email) {
        return adminRepository.findByUserEmail(email);
    }

    public List<Admin> getAllAdmins() {
        return adminRepository.findAll();
    }
}
