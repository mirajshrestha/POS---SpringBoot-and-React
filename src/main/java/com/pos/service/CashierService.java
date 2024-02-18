package com.pos.service;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Cashier;
import com.pos.repo.CashierRepository;

@Service
public class CashierService {

	@Autowired
	private CashierRepository cashierRepository;

	public Cashier generateRandomCashier() {
		String randomUsername = "cashier_" + RandomStringUtils.randomAlphanumeric(8);
		String randomPassword = RandomStringUtils.randomAlphanumeric(12);

		System.out.println(randomUsername);
		System.out.println(randomPassword);

		Cashier newCashier = new Cashier();
		newCashier.setUsername(randomUsername);
		newCashier.setPassword(randomPassword);
		newCashier.setStatus("inactive");
		return cashierRepository.save(newCashier);
	}

	public List<Cashier> getAllCashier() {
		return cashierRepository.findAll();
	}

	public void deleteCashier(Long id) {
		cashierRepository.deleteById(id);			
	}

	public Cashier authenticate(String username, String password) {
		Cashier cashier = cashierRepository.findByUsername(username);
		if (cashier != null) {
			if (cashier.isPasswordHashed() && BCrypt.checkpw(password, cashier.getPassword())) {
				return cashier;
			} else if (!cashier.isPasswordHashed() && password.equals(cashier.getPassword())) {
				return cashier;
			}
		}
		return null;
	}

	public Cashier getUserById(Long cashierId) {
		return cashierRepository.findById(cashierId).orElse(null);
	}

	public void updateCashier(Cashier existingCashier) {
		if (!existingCashier.getPassword().isEmpty()) {
			if (!existingCashier.isPasswordHashed()) {
				String hashedPassword = BCrypt.hashpw(existingCashier.getPassword(), BCrypt.gensalt());
				existingCashier.setPassword(hashedPassword);
				existingCashier.setPasswordHashed(true);
			}}

		cashierRepository.save(existingCashier);
		
	}
	
}
