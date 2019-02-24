package com.tcdevelop.techshop.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.tcdevelop.techshop.errorhandler.ErrorObject;
import com.tcdevelop.techshop.model.User;
import com.tcdevelop.techshop.service.UserService;
import com.tcdevelop.techshop.utils.EmailUtils;

@RestController
public class LoginController {

	@Autowired
	UserService service;

	@Autowired
	EmailUtils emailUtils;

	@PostMapping("/register")
	public ResponseEntity<@Valid User> insertUser(@RequestBody @Valid User user) {
		return service.register(user);
	}

	@PostMapping("/sendActivationEmail")
	public ResponseEntity sendActivationEmail(@RequestBody @Valid User user) {
		return service.sendActivationEmail(user);
	}

	@PostMapping("/registerActivation/{confirmHash}")
	public ResponseEntity<@Valid User> insertUser(@PathVariable String confirmHash) {
		return service.activate(confirmHash);
	}
}
