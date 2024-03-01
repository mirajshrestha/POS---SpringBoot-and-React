package com.pos.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Transaction {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;

	@ManyToOne
	@JoinColumn(name = "product_id")
	private Product product;

	private Long cashierId;
	private Integer quantity;
	private Integer totalPrice;
	
	private LocalDateTime checkoutDateTime;

	public Transaction() {

	}

	public Transaction(Long id, Product product, Long cashierId, Integer quantity, Integer totalPrice,
			LocalDateTime checkoutDateTime) {
		super();
		this.id = id;
		this.product = product;
		this.cashierId = cashierId;
		this.quantity = quantity;
		this.totalPrice = totalPrice;
		this.checkoutDateTime = checkoutDateTime;
	}

	public Long getCashierId() {
		return cashierId;
	}

	public void setCashierId(Long cashierId) {
		this.cashierId = cashierId;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Product getProduct() {
		return product;
	}

	public void setProduct(Product product) {
		this.product = product;
	}

	public Integer getQuantity() {
		return quantity;
	}

	public void setQuantity(Integer quantity) {
		this.quantity = quantity;
	}

	public Integer getTotalPrice() {
		return totalPrice;
	}

	public void setTotalPrice(Integer totalPrice) {
		this.totalPrice = totalPrice;
	}

	public LocalDateTime getCheckoutDateTime() {
		return checkoutDateTime;
	}

	public void setCheckoutDateTime(LocalDateTime checkoutDateTime) {
		this.checkoutDateTime = checkoutDateTime;
	}

}
