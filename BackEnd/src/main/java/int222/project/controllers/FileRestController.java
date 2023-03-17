package int222.project.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import int222.project.models.ExtendService;

@RestController
public class FileRestController {
	@Autowired
	ExtendService ES;

	@GetMapping(value = "/getImage/{name}", produces = { MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE })
	public byte[] getImage(@PathVariable String name) throws IOException {
		return ES.getFile(name);
	}

}
