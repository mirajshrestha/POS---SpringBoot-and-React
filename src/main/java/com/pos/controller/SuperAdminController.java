package com.pos.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pos.model.SuperAdmin;
import com.pos.repo.SuperAdminRepository;
import com.pos.service.SuperAdminService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/superadmin")
public class SuperAdminController {
	
	@Autowired
	private SuperAdminService superAdminService;
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody SuperAdmin superAdmin, HttpSession session) {
		String username = superAdmin.getUsername();
		String password = superAdmin.getPassword();
		
		SuperAdmin storedUser = superAdminService.authenticate(username, password);
		if (storedUser == null) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
		}
		session.setAttribute("userId", storedUser.getId());
		session.setAttribute("username", storedUser.getUsername());

		return ResponseEntity.ok("Login successful");
		
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("Logout Successful");
	}
}
