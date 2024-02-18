package com.pos.repo;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Admin;
import java.util.List;


public interface AdminRepository extends JpaRepository<Admin, Long>{

	Admin findByUsername(String username);

}
