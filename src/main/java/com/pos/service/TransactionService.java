package com.pos.service;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Transaction;
import com.pos.repo.TransactionRepository;

@Service
public class TransactionService {
	
	@Autowired
	private TransactionRepository transactionRepository;

	public List<Transaction> getTransactions(Long cashierId) {
		// TODO Auto-generated method stub
		return transactionRepository.findByCashierId(cashierId);
	}
	
}
