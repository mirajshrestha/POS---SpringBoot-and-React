package com.pos.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.SubCategory;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Long>{

	List<SubCategory> findByParentCategoryId(Long categoryId);

}
