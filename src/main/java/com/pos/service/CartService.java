package com.pos.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pos.model.Cart;
import com.pos.model.Cashier;
import com.pos.model.Product;
import com.pos.model.Transaction;
import com.pos.repo.CartRepository;
import com.pos.repo.ProductRepository;
import com.pos.repo.TransactionRepository;

import config.CartRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import jakarta.transaction.Transactional;

@Service
public class CartService {

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private ProductRepository productRepository;

	@Autowired
	private ProductService productService;

	@Autowired
	private CashierService cashierService;
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Autowired
    private HttpServletRequest request;

	public void addToCart(CartRequest cartRequest) {

		Product product = productService.getProductById(cartRequest.getProductId());

		Cart existingCartItem = cartRepository.findByProductId(cartRequest.getProductId());

		if (existingCartItem != null) {
			existingCartItem.setQuantity(existingCartItem.getQuantity() + cartRequest.getQuantity());
		} else {
			Cart cartItem = new Cart();
			cartItem.setProduct(product);
			cartItem.setQuantity(cartRequest.getQuantity());
			cartRepository.save(cartItem);
		}

		if (product.getQuantity() >= cartRequest.getQuantity()) {

			product.setQuantity(product.getQuantity() - cartRequest.getQuantity());
			productRepository.save(product);
		} else {
			throw new RuntimeException("Insufficient product quantity");
		}

	}

	public List<Cart> getAllProducts() {
		List<Cart> product = new ArrayList<>();
		cartRepository.findAll().forEach(product::add);
		return product;
	}

	@Transactional
	public void clearCart() {
		List<Cart> cartItems = cartRepository.findAll();
		for (Cart cartItem : cartItems) {
			Product product = cartItem.getProduct();
			int quantityToRestore = cartItem.getQuantity();
			product.setQuantity(product.getQuantity() + quantityToRestore);
			productRepository.save(product);
		}
		cartRepository.deleteAll();
	}

	public void removeFromCart(Long cartItemId) {
		Optional<Cart> cartItemOptional = cartRepository.findById(cartItemId);
		if (cartItemOptional.isPresent()) {
			Cart cartItem = cartItemOptional.get();
			Product product = cartItem.getProduct();

			// Add quantity back to the product
			product.setQuantity(product.getQuantity() + cartItem.getQuantity());
			// Remove the item from the cart
			cartRepository.deleteById(cartItemId);
		} else {
			throw new RuntimeException("Cart item not found");
		}

	}

	public void checkout() {
		List<Cart> cartItems = cartRepository.findAll();
		
		Long cashierId = (Long) request.getSession().getAttribute("cashierId");
		
		for(Cart cartItem : cartItems) {
			Transaction transaction = new Transaction();
			transaction.setProduct(cartItem.getProduct());
			transaction.setQuantity(cartItem.getQuantity());
			
			double totalPrice = cartItem.getProduct().getPrice() * cartItem.getQuantity();
			transaction.setTotalPrice((int) totalPrice);
			
			transaction.setCashierId(cashierId);
			
			transactionRepository.save(transaction);
		}
		cartRepository.deleteAll();
	}

}
