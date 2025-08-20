package com.devendra.removebg.repository;

import com.devendra.removebg.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

// Repository interface for UserEntity
// Extends JpaRepository to provide the CRUD operations and JPA functionality.
// The entity type is UserEntity and the primary key is of type Long

public interface UserRepository extends JpaRepository<UserEntity, Long> {

    // Optional<T> is a wrapper class introduced in Java 8 in the java.util package. It represents a container that may or may not contain a non-null value of type T.

    Optional<UserEntity> findByClerkId(String clerkId);

    boolean existsByClerkId(String clerkId);

}
