package com.pos.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Category;
import com.pos.repo.CategoryRepository;

@Service
public class CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;

	public void addCategory(Category category) {
		categoryRepository.save(category);
	}

	public List<Category> getAllCategories() {
		return categoryRepository.findAll();
	}

	public void deleteCategory(Long id) {
		categoryRepository.deleteById(id);
	}

	public Category getCategoryById(Long parentCategoryId) {
		Optional<Category> categoryOptional = categoryRepository.findById(parentCategoryId);
		return categoryOptional.orElse(null);
	}
	
	
}
