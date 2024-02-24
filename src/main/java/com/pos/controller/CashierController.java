package com.pos.controller;

import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.mindrot.jbcrypt.BCrypt;
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

import com.pos.model.Cashier;
import com.pos.service.CartService;
import com.pos.service.CashierService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cashier")
public class CashierController {

	@Autowired
	private CashierService cashierService;
	
	@Autowired
	private CartService cartService;

	@PostMapping("/generateRandomCashier")
	public Cashier generateRandomCashier() {
		return cashierService.generateRandomCashier();
	}

	@GetMapping("/allCashier")
	public List<Cashier> getAllCashier() {
		return cashierService.getAllCashier();
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteCashier(@PathVariable Long id) {
		cashierService.deleteCashier(id);
		return ResponseEntity.ok("Cashier deleted");
	}

	@PostMapping("/login")
	public ResponseEntity<String> login(@RequestBody Cashier cashier, HttpSession session) {
		String username = cashier.getUsername();
		String password = cashier.getPassword();

		cashier = cashierService.authenticate(username, password);

		if (cashier == null) {
			return ResponseEntity.status(401).body("Invalid username or password");
		}
		session.setAttribute("cashierId", cashier.getId());

		return ResponseEntity.ok("Login successful - " + cashier.getStatus());

	}

	@GetMapping("/me")
	public ResponseEntity<?> getCurrentUser(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		if (session != null && session.getAttribute("cashierId") != null) {
			Long cashierId = (Long) session.getAttribute("cashierId");
			Cashier cashier = cashierService.getUserById(cashierId);

			if (cashier != null) {
				return ResponseEntity.ok(cashier);
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
	}

	@GetMapping("/logout")
	public ResponseEntity<?> logout(HttpSession session) {
		session.invalidate();
		cartService.clearCart();
		return ResponseEntity.ok("Logout Successful");
	}

	@PutMapping("/update")
	public ResponseEntity<String> updateCashier(@RequestBody Cashier updatedCashier, HttpSession session) {
		// Check if the user is authenticated
		if (session != null && session.getAttribute("cashierId") != null) {
			Long cashierId = (Long) session.getAttribute("cashierId");

			// Fetch the existing owner from the database
			Cashier existingCashier = cashierService.getUserById(cashierId);

			// Check if the owner exists
			if (existingCashier != null) {
				// Update the owner details
				existingCashier.setFull_name(updatedCashier.getFull_name());
				existingCashier.setContact(updatedCashier.getContact());
				existingCashier.setUsername(updatedCashier.getUsername());
				existingCashier.setEmail(updatedCashier.getEmail());
				existingCashier.setPassword(updatedCashier.getPassword());

				existingCashier.setStatus("active");
				existingCashier.isPasswordHashed();

				// Save the updated owner to the database
				cashierService.updateCashier(existingCashier);

				return ResponseEntity.ok("Cashier updated successfully");
			}
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
	}

	@PostMapping("/validatePassword")
	public ResponseEntity<Map<String, String>> validatePassword(@RequestBody Map<String, String> passwordData,
			HttpSession session) {
		if (session != null && session.getAttribute("cashierId") != null) {
			Long cashierId = (Long) session.getAttribute("cashierId");
			Cashier existingCashier = cashierService.getUserById(cashierId);

			if (existingCashier != null) {
				String currentPassword = passwordData.get("currentPassword");

				if (BCrypt.checkpw(currentPassword, existingCashier.getPassword())) {
					// Passwords match, send success response
					return ResponseEntity.ok(Collections.singletonMap("message", "Password validated successfully"));
				} else {
					// Passwords don't match, send error response
					return ResponseEntity.ok(Collections.singletonMap("message", "Incorrect Password"));
				}
			}
		}

		// Unauthorized access
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
				.body(Collections.singletonMap("message", "Unauthorized access"));
	}

}
