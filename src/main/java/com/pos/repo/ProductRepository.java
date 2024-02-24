package com.pos.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pos.model.Product;

public interface ProductRepository extends JpaRepository<Product, Long>{

	List<Product> findByAdminId(Long adminId);

	List<Product> findByManagerId(Long managerId);


}
