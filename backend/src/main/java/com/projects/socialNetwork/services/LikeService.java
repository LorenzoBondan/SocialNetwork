package com.projects.socialNetwork.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.socialNetwork.dto.LikeDTO;
import com.projects.socialNetwork.entities.Like;
import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.repositories.LikeRepository;
import com.projects.socialNetwork.repositories.PostRepository;
import com.projects.socialNetwork.services.exceptions.DataBaseException;
import com.projects.socialNetwork.services.exceptions.ResourceNotFoundException;

@Service
public class LikeService {

	@Autowired
	private LikeRepository repository;
	
	@Autowired
	private PostRepository postRepository;
	
	@Transactional(readOnly = true) // goes in PostResource
	public List<LikeDTO> findLikesByPostId(Long PostId) {
		Post post = postRepository.getOne(PostId);
		return post.getLikes().stream().map(comment -> new LikeDTO(comment)).collect(Collectors.toList());
	}

	@Transactional
	public LikeDTO insert(LikeDTO dto) {
		Like entity = new Like();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new LikeDTO(entity);
	}

	public void delete(Long id) {
		try {
			repository.deleteById(id);
		} catch (EmptyResultDataAccessException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}

		catch (DataIntegrityViolationException e) {
			throw new DataBaseException("Integrity Violation");
		}
	}

	private void copyDtoToEntity(LikeDTO dto, Like entity) {
		entity.setUser(dto.getUser());
		entity.setPost(dto.getPost());
	}

}
