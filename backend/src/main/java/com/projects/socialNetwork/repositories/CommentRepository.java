package com.projects.socialNetwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.socialNetwork.entities.Post;

@Repository
public interface CommentRepository extends JpaRepository<Post,Long>{

}
