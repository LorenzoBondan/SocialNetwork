package com.projects.socialNetwork.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.socialNetwork.dto.CommentDTO;
import com.projects.socialNetwork.services.CommentService;


@RestController
@RequestMapping(value = "/comments")
public class CommentResource {

	@Autowired
	private CommentService service;
	
	@PostMapping
	public ResponseEntity<CommentDTO> insert (@Valid @RequestBody CommentDTO dto) {
		CommentDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<CommentDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
