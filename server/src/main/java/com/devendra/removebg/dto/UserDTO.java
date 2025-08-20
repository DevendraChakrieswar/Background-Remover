package com.devendra.removebg.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDTO {

//    DTO stands for: Data Transfer Object.
//    Purpose: Used to transfer data between layers (like Controller ⇆ Service ⇆ DAO) or across network (like REST APIs).
//    Structure: A simple Java class with only fields, constructors, getters, setters — no business logic.

    private String clerkId;
    private String email;
    private String firstName;
    private String lastName;
    private String photoUrl;
    private Integer credits;

}
