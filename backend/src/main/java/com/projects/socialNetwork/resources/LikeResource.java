package com.projects.socialNetwork.resources;

import java.net.URI;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projects.socialNetwork.dto.LikeDTO;
import com.projects.socialNetwork.dto.PostDTO;
import com.projects.socialNetwork.dto.UserDTO;
import com.projects.socialNetwork.services.LikeService;


@RestController
@RequestMapping(value = "/likes")
public class LikeResource {

	@Autowired
	private LikeService service;
	
	@GetMapping(value = "/{id}") 
	public ResponseEntity<LikeDTO> findById(@PathVariable Long id) {
		LikeDTO dto = service.findById(id);	
		return ResponseEntity.ok().body(dto);
	}
	
	@PostMapping
	public ResponseEntity<LikeDTO> insert (@Valid @RequestBody LikeDTO dto) {
		LikeDTO newDto = service.insert(dto);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}")
				.buildAndExpand(newDto.getId()).toUri();
		return ResponseEntity.created(uri).body(newDto);	
	}
	
	@DeleteMapping(value = "/{id}")
	public ResponseEntity<LikeDTO> delete(@PathVariable Long id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
}
