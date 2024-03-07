package com.pos.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pos.model.Category;
import com.pos.model.SubCategory;
import com.pos.service.CategoryService;
import com.pos.service.SubCategoryService;

import config.SubCategoryRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/category/sub")
public class SubCategoryController {
	
	@Autowired
	private SubCategoryService subCategoryService;
	
	@Autowired
	private CategoryService categoryService;

	@PostMapping("/add")
	public ResponseEntity<String> addSubCategory(@RequestBody SubCategoryRequest request){
		Category parentCategory = categoryService.getCategoryById(request.getParentCategoryId());
		SubCategory subCategory = new SubCategory();
		subCategory.setName(request.getName());
		subCategory.setParentCategory(parentCategory);
		
		subCategoryService.addSubcategory(subCategory);
		return ResponseEntity.ok("Subcategory Added Successfully");
	}
	
	@GetMapping("/{categoryId}")
	public List<SubCategory> getAllSubCategories(@PathVariable Long categoryId){
		return subCategoryService.getSubCategoriesByCategoryId(categoryId);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteSubCategory(@PathVariable Long id) {
		subCategoryService.deleteSubCategory(id);
	}
}
