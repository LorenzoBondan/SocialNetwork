package com.projects.socialNetwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.socialNetwork.entities.Role;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>{

}
