package com.projects.socialNetwork.repositories;


import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.projects.socialNetwork.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{

	// METODO QUE BUSCA NO BANCO UM USUARIO POR EMAIL
	User findByEmail(String email);
	
	List<User> findByFollowers (Optional<User> obj);
	
	List<User> findByFollowing (Optional<User> obj);
	// BUSCAR TODOS OS USUÁRIOS QUE SE CHAMAM MARIA, EXEMPLO
	//List<User> findByFirstName(String firstName);
	
	@Query("SELECT DISTINCT obj FROM User obj "
			+ "WHERE (UPPER(obj.name) LIKE UPPER(CONCAT('%', :name, '%')) ) ORDER BY obj.name")
	Page<User> find(String name, Pageable pageable);
}
