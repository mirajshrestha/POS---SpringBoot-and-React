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
import com.pos.model.Manager;
import com.pos.service.ManagerService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/manager")
public class ManagerController {
	
	@Autowired
	private ManagerService managerService;
	
	@PostMapping("/generateRandomManager")
	public Manager generateRandomManager() {
		return managerService.generateRandomManager();
	}
	
	@GetMapping("/allManagers")
	public List<Manager> getAllManagers() {
		return managerService.getAllManagers();
	}
	
	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteManager(@PathVariable Long id) {
		managerService.deleteManager(id);
		return ResponseEntity.ok("Manager deleted");
	}
	
	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Manager manager, HttpSession session) {
		String username = manager.getUsername();
		String password = manager.getPassword();

		manager = managerService.authenticate(username, password);

		if (manager == null) {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
		session.setAttribute("managerId", manager.getId());

		return ResponseEntity.ok("Login successful - " + manager.getStatus());

	}
	
	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute("managerId") != null) {
			Long managerId = (Long) session.getAttribute("managerId");
			Manager manager = managerService.getUserById(managerId);

			if (manager != null) {
				return ResponseEntity.ok(manager);
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}
	
	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session){
		session.invalidate();
		return ResponseEntity.ok("Logout Successful");
	}
	
	@PutMapping("/update")
	public ResponseEntity<String> updateManager(@RequestBody Manager updatedManager, HttpSession session) {
		// Check if the user is authenticated
		if (session != null && session.getAttribute("managerId") != null) {
			Long managerId = (Long) session.getAttribute("managerId");

			// Fetch the existing owner from the database
			Manager existingManager = managerService.getUserById(managerId);

			// Check if the owner exists
			if (existingManager != null) {
				// Update the owner details
				existingManager.setFull_name(updatedManager.getFull_name());
				existingManager.setContact(updatedManager.getContact());
				existingManager.setUsername(updatedManager.getUsername());
				existingManager.setEmail(updatedManager.getEmail());
				existingManager.setPassword(updatedManager.getPassword());
				
				existingManager.setStatus("active");
				existingManager.isPasswordHashed();

				// Save the updated owner to the database
				managerService.updateManager(existingManager);

				return ResponseEntity.ok("Manager updated successfully");
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
	}
}
