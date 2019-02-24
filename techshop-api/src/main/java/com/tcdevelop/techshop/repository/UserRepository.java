package com.tcdevelop.techshop.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.tcdevelop.techshop.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUsername(String username);
	
	User findById(String uuid);
	
	User findByConfirmHash(String confirmHash);

}
