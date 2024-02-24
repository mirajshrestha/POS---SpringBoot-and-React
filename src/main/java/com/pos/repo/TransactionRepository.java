package com.pos.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{

	List<Transaction> findByCashierId(Long cashierId);

}
