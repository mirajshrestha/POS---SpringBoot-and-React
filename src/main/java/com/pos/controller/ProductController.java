package com.pos.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pos.model.Admin;
import com.pos.model.Category;
import com.pos.model.Manager;
import com.pos.model.Product;
import com.pos.service.ProductService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/add")
	public ResponseEntity<String> addProduct(@RequestPart("image") MultipartFile image,
			@RequestPart("product") Product product, @RequestParam("categoryId") Long categoryId,
			@RequestParam("subCategoryId") Long subCategoryId, HttpServletRequest request) throws IOException {

		Long adminId = (Long) request.getSession().getAttribute("adminId");
		Long managerId = (Long) request.getSession().getAttribute("managerId");

		if (adminId == null && managerId == null) {
			return ResponseEntity.badRequest().body("User not found");
		} else if (adminId != null) {
			Admin admin = new Admin();
			admin.setId(adminId);
			product.setAdmin(admin);

			System.out.println("Data " + product);

			String imagePath = productService.saveImage(image);
			product.setImg(imagePath);

			productService.registerProduct(product, categoryId, subCategoryId);

			return ResponseEntity.ok("Product Added By Admin");
		} else if (managerId != null) {
			Manager manager = new Manager();
			manager.setId(managerId);
			product.setManager(manager);

			System.out.println("Data " + product);

			String imagePath = productService.saveImage(image);
			product.setImg(imagePath);

			productService.registerProduct(product, categoryId, subCategoryId);

			return ResponseEntity.ok("Product Added By Manager");
		}

		return ResponseEntity.ok("Product Added Successfully");

	}

	@GetMapping("admin")
	public ResponseEntity<List<Product>> getProductsByAdmin(HttpSession session) {
		Long adminId = (Long) session.getAttribute("adminId");
		if (adminId != null) {
			List<Product> product = productService.getProductsByAdminId(adminId);
			return ResponseEntity.ok(product);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}

	@GetMapping("manager")
	public ResponseEntity<List<Product>> getProductsByManager(HttpSession session) {
		Long managerId = (Long) session.getAttribute("managerId");
		if (managerId != null) {
			List<Product> product = productService.getProductsByManager(managerId);
			return ResponseEntity.ok(product);
		}
		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> deleteProduct(@PathVariable Long id) {
		productService.deleteProduct(id);
		return ResponseEntity.ok("Product deleted");

	}

	@PutMapping("/update/{productId}")
	public ResponseEntity<String> updateProduct(@PathVariable Long productId,
			@RequestPart(value = "image", required = false) MultipartFile image,
			@RequestPart(value = "product", required = false) Product updatedProduct, HttpServletRequest request)
			throws IOException {
		Long adminId = (Long) request.getSession().getAttribute("adminId");
		Long managerId = (Long) request.getSession().getAttribute("managerId");

		if (adminId == null && managerId == null) {
			return ResponseEntity.badRequest().body("User not found");
		}

		Product existingProduct = productService.getProductById(productId);

		if (existingProduct == null) {
			return ResponseEntity.badRequest().body("Product not found");
		}

		if ((adminId != null && existingProduct.getAdmin().getId().equals(adminId))
				|| (managerId != null && existingProduct.getManager().getId().equals(managerId))) {

			if (updatedProduct != null) {
				existingProduct.setName(updatedProduct.getName());
				existingProduct.setPrice(updatedProduct.getPrice());
				existingProduct.setQuantity(updatedProduct.getQuantity());
			}

			if (image != null) {
				String imagePath = productService.saveImage(image);
				existingProduct.setImg(imagePath);
			}

			productService.updateProduct(existingProduct);

			return ResponseEntity.ok("Product updated successfully");
		}

		return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized access");
	}

	@GetMapping("/all")
	public List<Product> getAllProducts() {
		return productService.getAllProducts();
	}
}
