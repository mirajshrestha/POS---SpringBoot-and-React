package com.pos.service;

import java.util.List;
import java.util.Optional;

import org.apache.commons.lang3.RandomStringUtils;
import org.mindrot.jbcrypt.BCrypt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Admin;
import com.pos.repo.AdminRepository;

@Service
public class AdminService {

	@Autowired
	private AdminRepository adminRepository;

	public Admin generateRandomAdmin() {
		String randomUsername = "admin_" + RandomStringUtils.randomAlphanumeric(8);
		String randomPassword = RandomStringUtils.randomAlphanumeric(12);

		System.out.println(randomUsername);
		System.out.println(randomPassword);

		Admin newAdmin = new Admin();
		newAdmin.setUsername(randomUsername);
		newAdmin.setPassword(randomPassword);
		newAdmin.setStatus("inactive");
		return adminRepository.save(newAdmin);
	}

	public List<Admin> getAllAdmins() {
		return adminRepository.findAll();
	}

	public void deleteAdmin(Long id) {
		adminRepository.deleteById(id);

	}

//	public String getAdminStatus(Long adminId) {
//		Admin admin = adminRepository.findById(adminId).orElse(null);
//		return admin != null ? admin.getStatus() : null;
//	}

	public Admin authenticate(String username, String password) {
		Admin admin = adminRepository.findByUsername(username);
//		if (admin != null && admin.getPassword().equals(password)) {
//			return admin;
//		}
		if (admin != null) {
			if (admin.isPasswordHashed() && BCrypt.checkpw(password, admin.getPassword())) {
				return admin;
			} else if (!admin.isPasswordHashed() && password.equals(admin.getPassword())) {
				return admin;
			}
		}
		return null;
	}

	public Admin getUserById(Long adminId) {
		return adminRepository.findById(adminId).orElse(null);
	}

	public void updateAdmin(Admin existingAdmin) {
		if (!existingAdmin.getPassword().isEmpty()) {
			if (!existingAdmin.isPasswordHashed()) {
				String hashedPassword = BCrypt.hashpw(existingAdmin.getPassword(), BCrypt.gensalt());
				existingAdmin.setPassword(hashedPassword);
				existingAdmin.setPasswordHashed(true);
			}
//			String hashedPassword = BCrypt.hashpw(existingAdmin.getPassword(), BCrypt.gensalt());
//			existingAdmin.setPassword(hashedPassword);
		}

		adminRepository.save(existingAdmin);

	}

}
