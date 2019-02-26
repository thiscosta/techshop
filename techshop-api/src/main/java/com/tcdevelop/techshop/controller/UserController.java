package com.tcdevelop.techshop.controller;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tcdevelop.techshop.model.User;
import com.tcdevelop.techshop.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

	@Autowired
	UserService service;

	@PreAuthorize("hasRole('ROLE_SYSTEMADMINISTRATOR') and #oauth2.hasScope('read')")
	@GetMapping
	public ResponseEntity<List<User>> listUsers() {
		return ResponseEntity.ok(service.listUsers());
	}

	@PreAuthorize("hasRole('ROLE_SYSTEMADMINISTRATOR') and #oauth2.hasScope('write')")
	@PostMapping
	public ResponseEntity<@Valid User> insertUser(@RequestBody @Valid User user) {
		return ResponseEntity.ok(service.upsertUser(user));
	}

	@PreAuthorize("hasRole('ROLE_SYSTEMADMINISTRATOR') and #oauth2.hasScope('read')")
	@GetMapping("/{id}")
	public ResponseEntity<User> insertUser(@PathVariable String id) {

		User user = service.getUserById(id);

		if (user == null) {
			ResponseEntity.notFound().build();
		}

		return ResponseEntity.ok(user);
	}

	@PreAuthorize("hasRole('ROLE_SYSTEMADMINISTRATOR') and #oauth2.hasScope('write')")
	@PatchMapping("/{id}")
	public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody @Valid User user) {
		User newUser = service.getUserById(id);

		if (newUser == null) {
			ResponseEntity.notFound().build();
		}
		
		BeanUtils.copyProperties(user, newUser, "id");
		
		return ResponseEntity.ok(service.upsertUser(newUser));
		
	}
	
	@PreAuthorize("hasRole('ROLE_SYSTEMADMINISTRATOR') and #oauth2.hasScope('trust')")
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable String id) {
		User user = service.getUserById(id);

		if (user == null) {
			ResponseEntity.notFound().build();
		}
		
		service.deleteUser(user);
	}
}
