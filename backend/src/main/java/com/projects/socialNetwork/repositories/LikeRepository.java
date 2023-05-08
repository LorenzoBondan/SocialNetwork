package com.projects.socialNetwork.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projects.socialNetwork.entities.Like;

@Repository
public interface LikeRepository extends JpaRepository<Like,Long>{

}
