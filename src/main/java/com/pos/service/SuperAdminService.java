package com.pos.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.SuperAdmin;
import com.pos.repo.SuperAdminRepository;

@Service
public class SuperAdminService {
	@Autowired
	private SuperAdminRepository superAdminRepository;

	public SuperAdmin authenticate(String username, String password) {
		SuperAdmin superAdmin = superAdminRepository.findByUsername(username);
		if(superAdmin!= null && superAdmin.getPassword().equals(password)) {
			return superAdmin;
		}
		return null;
	}
}
