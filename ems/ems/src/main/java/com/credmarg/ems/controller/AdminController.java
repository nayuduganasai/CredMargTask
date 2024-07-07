package com.credmarg.ems.controller;

import com.credmarg.ems.entity.Admin;
import com.credmarg.ems.entity.Employee;
import com.credmarg.ems.entity.SentEmails;
import com.credmarg.ems.entity.Vendor;
import com.credmarg.ems.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173/**")
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;

    @Autowired
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @PostMapping("/employees")
    public Employee createEmployee(@RequestBody Employee employee, @RequestParam String adminEmail) {
        return adminService.createEmployee(employee,adminEmail);
    }

    @PutMapping("/employee")
    public Employee updateEmployee(@RequestParam String email, @RequestBody Employee employee) {
        return adminService.updateEmployee(email, employee);
    }

    @DeleteMapping("/employees")
    public void deleteEmployee(@RequestParam String email) {
        adminService.deleteEmployee(email);
    }

    @GetMapping("/employees")
    public List<Employee> getAllEmployees(@RequestParam String adminMail) {
        return adminService.getAllEmployees(adminMail);
    }

    @PostMapping("/vendors")
    public Vendor createVendor(@RequestBody Vendor vendor,@RequestParam String adminEmail) {
        return adminService.createVendor(vendor,adminEmail);
    }

    @PutMapping("/vendors")
    public Vendor updateVendor(@RequestParam String email , @RequestBody Vendor vendor) {
        return adminService.updateVendor(email, vendor);
    }

    @DeleteMapping("/vendors")
    public void deleteVendor(@RequestParam String email) {
        adminService.deleteVendor(email);
    }

    @GetMapping("/vendors")
    public List<Vendor> getAllVendors(@RequestParam String adminMail) {
        return adminService.getAllVendors(adminMail);
    }

    @PostMapping("/vendors/send-email")
    public void sendEmailToVendors(@RequestBody List<String> vendorEmails, @RequestParam String adminMail) {
        adminService.sendEmailToVendors(vendorEmails,adminMail);
    }

    @GetMapping("/sent-emails")
    public List<SentEmails> getSentEmails( @RequestParam String adminMail) {
        return adminService.getSentEmails(adminMail);
    }

    @GetMapping("/vendors/emails")
    public ResponseEntity<List<String>> getVendorEmails(@RequestParam String adminEmail) {
        List<String> vendorEmails = adminService.getVendorEmailsByAdminEmail(adminEmail);
        return ResponseEntity.ok(vendorEmails);
    }

}
