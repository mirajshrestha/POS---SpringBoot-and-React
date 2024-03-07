package com.pos.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.SubCategory;
import com.pos.repo.SubCategoryRepository;

@Service
public class SubCategoryService {
	
	@Autowired
	private SubCategoryRepository subCategoryRepository;

	public void addSubcategory(SubCategory subCategory) {
		subCategoryRepository.save(subCategory);
		
	}

	public List<SubCategory> getSubCategoriesByCategoryId(Long categoryId) {
		return subCategoryRepository.findByParentCategoryId(categoryId);
	}

	public void deleteSubCategory(Long id) {
		subCategoryRepository.deleteById(id);
	}
}
