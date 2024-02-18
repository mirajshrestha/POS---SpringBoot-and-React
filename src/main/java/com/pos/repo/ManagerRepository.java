package com.pos.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Manager;

public interface ManagerRepository extends JpaRepository<Manager, Long>{

	Manager findByUsername(String username);

}
