package com.pos.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long>{

}
