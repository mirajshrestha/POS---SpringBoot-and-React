package com.pos.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Cashier;

public interface CashierRepository extends JpaRepository<Cashier, Long>{

	Cashier findByUsername(String username);

}
