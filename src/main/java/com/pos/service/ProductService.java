package com.pos.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;

import org.springframework.util.StringUtils;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pos.model.Category;
import com.pos.model.Product;
import com.pos.repo.CategoryRepository;
import com.pos.repo.ProductRepository;

@Service
public class ProductService {

	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	public String saveImage(MultipartFile image) throws IOException {
//		String uploadDir = "C:\\Users\\MODERN\\Documents\\workspace-spring-tool-suite-4-4.18.1.RELEASE\\pos_application\\uploads";
		String uploadDir = "uploads/";

		Path uploadPath = Path.of(uploadDir);

		System.out.println(uploadPath.toString());

		if (!Files.exists(uploadPath)) {
			Files.createDirectories(uploadPath);
		}

		String fileName = StringUtils.cleanPath(image.getOriginalFilename());
		String uniqueFileName = System.currentTimeMillis() + "_" + fileName;

		Path filePath = uploadPath.resolve(uniqueFileName);
		Files.copy(image.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);

		return uniqueFileName;
	}

	public void registerProduct(Product product, Long categoryId) {
		Category category = categoryRepository.findById(categoryId)
				.orElseThrow(() -> new RuntimeException("Category Not Found"));
		product.setCategory(category);
		
		productRepository.save(product);

	}

	public List<Product> getProductsByAdminId(Long adminId) {
		return productRepository.findByAdminId(adminId);
	}

	public List<Product> getProductsByManager(Long managerId) {
		return productRepository.findByManagerId(managerId);
	}

	public void deleteProduct(Long id) {
		productRepository.deleteById(id);

	}

	public Product getProductById(Long productId) {
		return productRepository.findById(productId).orElse(null);
	}

	public void updateProduct(Product updatedProduct) {
		productRepository.save(updatedProduct);
		
	}

	public List<Product> getAllProducts() {
		List<Product> product = new ArrayList<>();
		productRepository.findAll().forEach(product::add);
		return product;
	}

}
