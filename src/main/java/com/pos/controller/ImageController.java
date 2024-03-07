package com.pos.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/images")
public class ImageController {
	@GetMapping("/{imageName}")
	public ResponseEntity<byte[]> getImage(@PathVariable String imageName) throws IOException {
//		String imagePath = "C:\\Users\\MODERN\\Documents\\workspace-spring-tool-suite-4-4.18.1.RELEASE\\pos_application\\uploads\\"
//				+ imageName;
		
		String imagePath = "uploads/"
				+ imageName;

		Path path = Paths.get(imagePath);
		byte[] imageBytes = Files.readAllBytes(path);

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.IMAGE_JPEG);
		headers.setContentLength(imageBytes.length);

		return new ResponseEntity<>(imageBytes, headers, HttpStatus.OK);
	}
}
