package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pos.model.Admin;
import com.pos.service.AdminService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private AdminService adminService;

	@PostMapping("/generateRandomAdmin")
	public Admin generateRandomAdmin() {
		return adminService.generateRandomAdmin();
	}

	@GetMapping("/allAdmins")
	public List<Admin> getAllAdmins() {
		return adminService.getAllAdmins();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteAdmin(@PathVariable Long id) {
		adminService.deleteAdmin(id);
		return ResponseEntity.ok("Admin deleted");
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Admin admin, HttpSession session) {
		String username = admin.getUsername();
		String password = admin.getPassword();

		admin = adminService.authenticate(username, password);

		if (admin == null) {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
		session.setAttribute("adminId", admin.getId());

		return ResponseEntity.ok("Login successful - " + admin.getStatus());

	}

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute("adminId") != null) {
			Long adminId = (Long) session.getAttribute("adminId");
			Admin admin = adminService.getUserById(adminId);

			if (admin != null) {
				return ResponseEntity.ok(admin);
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateOwner(@RequestBody Admin updatedAdmin, HttpSession session) {
		// Check if the user is authenticated
		if (session != null && session.getAttribute("adminId") != null) {
			Long adminId = (Long) session.getAttribute("adminId");

			// Fetch the existing owner from the database
			Admin existingAdmin = adminService.getUserById(adminId);

			// Check if the owner exists
			if (existingAdmin != null) {
				// Update the owner details
				existingAdmin.setFull_name(updatedAdmin.getFull_name());
				existingAdmin.setContact(updatedAdmin.getContact());
				existingAdmin.setUsername(updatedAdmin.getUsername());
				existingAdmin.setEmail(updatedAdmin.getEmail());
				existingAdmin.setPassword(updatedAdmin.getPassword());
				
				existingAdmin.setStatus("active");
				existingAdmin.isPasswordHashed();

				// Save the updated owner to the database
				adminService.updateAdmin(existingAdmin);

				return ResponseEntity.ok("Admin updated successfully");
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("Logout Successful");
	}
}
