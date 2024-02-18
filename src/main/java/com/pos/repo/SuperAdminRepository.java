package com.pos.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.SuperAdmin;

public interface SuperAdminRepository extends JpaRepository<SuperAdmin, Long>{

	SuperAdmin findByUsername(String username);

}
