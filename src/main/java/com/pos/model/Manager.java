package com.pos.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Manager {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private String username;
	private String password;
	private String status;
	private String email;
	private String contact;
	private String full_name;
	private boolean passwordHashed;
	
	@OneToMany(mappedBy = "manager")
	@JsonIgnore
	private Set<Product> product = new HashSet<>();
	
	public Manager() {
		
	}

	public Manager(Long id, String username, String password, String status, String email, String contact,
			String full_name, boolean passwordHashed, Set<Product> product) {
		super();
		this.id = id;
		this.username = username;
		this.password = password;
		this.status = status;
		this.email = email;
		this.contact = contact;
		this.full_name = full_name;
		this.passwordHashed = passwordHashed;
		this.product = product;
	}

	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public String getStatus() {
		return status;
	}


	public void setStatus(String status) {
		this.status = status;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getContact() {
		return contact;
	}


	public void setContact(String contact) {
		this.contact = contact;
	}


	public String getFull_name() {
		return full_name;
	}


	public void setFull_name(String full_name) {
		this.full_name = full_name;
	}


	public boolean isPasswordHashed() {
		return passwordHashed;
	}


	public void setPasswordHashed(boolean passwordHashed) {
		this.passwordHashed = passwordHashed;
	}

	public Set<Product> getProduct() {
		return product;
	}

	public void setProduct(Set<Product> product) {
		this.product = product;
	}
	
}
