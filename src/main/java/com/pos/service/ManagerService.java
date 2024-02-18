package com.pos.service;

import java.util.List;

import org.apache.commons.lang3.RandomStringUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Manager;
import com.pos.repo.ManagerRepository;

@Service
public class ManagerService {
	
	@Autowired
	private ManagerRepository managerRepository;

	public Manager generateRandomManager() {
		String randomUsername = "manager_" + RandomStringUtils.randomAlphanumeric(8);
		String randomPassword = RandomStringUtils.randomAlphanumeric(12);

		System.out.println(randomUsername);
		System.out.println(randomPassword);

		Manager newManager = new Manager();
		newManager.setUsername(randomUsername);
		newManager.setPassword(randomPassword);
		newManager.setStatus("inactive");
		return managerRepository.save(newManager);
	}

	public List<Manager> getAllManagers() {
		return managerRepository.findAll();
	}

	public void deleteManager(Long id) {
		managerRepository.deleteById(id);	
	}

	public Manager authenticate(String username, String password) {
		Manager manager = managerRepository.findByUsername(username);
		if (manager != null) {
			if (manager.isPasswordHashed() && BCrypt.checkpw(password, manager.getPassword())) {
				return manager;
			} else if (!manager.isPasswordHashed() && password.equals(manager.getPassword())) {
				return manager;
			}
		}
		return null;
	}

	public Manager getUserById(Long managerId) {
		return managerRepository.findById(managerId).orElse(null);
	}

	public void updateManager(Manager existingManager) {
		if (!existingManager.getPassword().isEmpty()) {
			if (!existingManager.isPasswordHashed()) {
				String hashedPassword = BCrypt.hashpw(existingManager.getPassword(), BCrypt.gensalt());
				existingManager.setPassword(hashedPassword);
				existingManager.setPasswordHashed(true);
			}}

		managerRepository.save(existingManager);
	}

}
