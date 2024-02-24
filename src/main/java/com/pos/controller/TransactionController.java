package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pos.model.Product;
import com.pos.model.Transaction;
import com.pos.service.TransactionService;

import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/transaction")
public class TransactionController {
	
	@Autowired
	private TransactionService transactionService;
	
	@GetMapping("me")
	public ResponseEntity<List<Transaction>> getTransactions(HttpSession session) {
		Long cashierId = (Long) session.getAttribute("cashierId");
		if (cashierId != null) {
			List<Transaction> transaction = transactionService.getTransactions(cashierId);
			return ResponseEntity.ok(transaction);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}
}
