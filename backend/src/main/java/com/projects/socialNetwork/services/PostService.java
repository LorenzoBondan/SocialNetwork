package com.projects.socialNetwork.services;

import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.projects.socialNetwork.dto.PostDTO;

import com.projects.socialNetwork.entities.Post;
import com.projects.socialNetwork.repositories.PostRepository;
import com.projects.socialNetwork.services.exceptions.DataBaseException;
import com.projects.socialNetwork.services.exceptions.ResourceNotFoundException;

@Service
public class PostService {

	@Autowired
	private PostRepository repository;

	@Transactional(readOnly = true)
	public Page<PostDTO> findAllPaged(Pageable pageable) {
		Page<Post> list = repository.findAll(pageable);
		return list.map(x -> new PostDTO(x));
	}

	@Transactional(readOnly = true)
	public PostDTO findById(Long id) {
		Optional<Post> obj = repository.findById(id);
		Post entity = obj.orElseThrow(() -> new ResourceNotFoundException("Entity not found."));
		return new PostDTO(entity);
	}

	@Transactional
	public PostDTO insert(PostDTO dto) {
		Post entity = new Post();
		copyDtoToEntity(dto, entity);
		entity = repository.save(entity);
		return new PostDTO(entity);
	}

	@Transactional
	public PostDTO update(Long id, PostDTO dto) {
		try {
			Post entity = repository.getOne(id);
			copyDtoToEntity(dto, entity);
			entity = repository.save(entity);
			return new PostDTO(entity);
		} catch (EntityNotFoundException e) {
			throw new ResourceNotFoundException("Id not found " + id);
		}
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

	private void copyDtoToEntity(PostDTO dto, Post entity) {
		entity.setTitle(dto.getTitle());
		entity.setDescription(dto.getDescription());
		entity.setDate(dto.getDate());
		entity.setUser(dto.getUser());
	}


}
