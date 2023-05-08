package com.projects.socialNetwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.socialNetwork.entities.Comment;

@Repository
public interface CommentRepository extends JpaRepository<Comment,Long>{

}
