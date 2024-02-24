package com.pos.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pos.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Long>{

	Cart findByProductId(Long productId);

}
