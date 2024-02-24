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
import org.springframework.web.bind.annotation.RestController;

import com.pos.model.Cart;
import com.pos.model.Product;
import com.pos.service.CartService;

import config.CartRequest;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/cart")
public class CartController {

	@Autowired
	private CartService cartService;
	
	@PostMapping("/add")
	public ResponseEntity<String> addToCart(@RequestBody CartRequest cartRequest) {
		cartService.addToCart(cartRequest);
		return ResponseEntity.ok("Product added to cart successfully");
	}
	
	@GetMapping("/all")
	public List<Cart> getAllProducts() {
		System.out.println(cartService.getAllProducts());
		return cartService.getAllProducts();
		
	}
	
	@DeleteMapping("/remove/{cartItemId}")
    public ResponseEntity<String> removeFromCart(@PathVariable Long cartItemId) {
        cartService.removeFromCart(cartItemId);
        return ResponseEntity.ok("Product removed from cart successfully");
    }
	
	@PostMapping("/checkout")
	public ResponseEntity<String> checkout() {
        cartService.checkout();
        return ResponseEntity.ok("Checkout successful");
    }
	
}
