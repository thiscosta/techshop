package com.tcdevelop.techshop.service;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.tcdevelop.techshop.errorhandler.ErrorObject;
import com.tcdevelop.techshop.model.User;
import com.tcdevelop.techshop.repository.UserRepository;
import com.tcdevelop.techshop.utils.EmailUtils;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;

	@Autowired
	EmailUtils emailUtils;

	public List<User> listUsers() {
		return userRepository.findAll();
	}

	public User getUserById(String id) {
		return userRepository.findById(id);
	}

	public User upsertUser(User user) {
		return userRepository.save(user);
	}

	public void deleteUser(User user) {
		userRepository.delete(user);
	}

	public ResponseEntity<User> register(@Valid User user) {

		user.setRole("Standard User");
		user.setEnabled(false);
		user.setConfirmHash(UUID.randomUUID().toString());

		return ResponseEntity.ok(userRepository.save(user));
	}

	public ResponseEntity<@Valid User> activate(String confirmHash) {
		User user = userRepository.findByConfirmHash(confirmHash);

		if (user == null) {
			return ResponseEntity.notFound().build();
		} else if (user.isEnabled()) {
			return ResponseEntity.noContent().build();
		}

		user.setEnabled(true);

		return ResponseEntity.ok(userRepository.save(user));
	}

	public ResponseEntity sendActivationEmail(@Valid User user) {
		user = userRepository.findById(user.getId());
		if (user.getLastConfirmSolicitation() == 0) {
			System.out.println("caiu no == 0: "+user.getLastConfirmSolicitation());
			user.setLastConfirmSolicitation(new Date().getTime());
			userRepository.save(user);
			return emailUtils.sendActivationEmail(user);
		} else {
			
			Date lastSolicitation = new Date(user.getLastConfirmSolicitation());
			Date now = new Date();
			long diff = now.getTime() - lastSolicitation.getTime();
			long diffMinutes = diff / (60 * 1000) % 60;
			
			if (diffMinutes >= 5) {
				
				user.setLastConfirmSolicitation(new Date().getTime());
				userRepository.save(user);
				return emailUtils.sendActivationEmail(user);
				
			} else {
				user.setConfirmHash("");
				return ResponseEntity.unprocessableEntity().body(new ErrorObject(
						"You must wait at least 5 minutes between confirm solicitations", "", user));
			
			}
		}

	}

}
