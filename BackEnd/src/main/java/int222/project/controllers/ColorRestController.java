package int222.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.models.Color;
import int222.project.repositories.ColorJpaRepository;

@RestController
public class ColorRestController {
	@Autowired
	ColorJpaRepository colorJpaRepository;

	@GetMapping("/colors")
	public List<Color> getAllColor() {
		return colorJpaRepository.findAll();
	};

	@GetMapping("/color/{colorId}")
	public Color getColor(@PathVariable int colorId) {
		return colorJpaRepository.findById(colorId).orElse(null);
	};

	@PostMapping("/admin/addcolor")
	public Color addColor(@RequestBody Color color) {
		if(!colorJpaRepository.findByColorName(color.getColorName()).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name has been use"  );
		}
		return colorJpaRepository.save(color);
	}

	@DeleteMapping("/admin/colordelete/{id}")
	public String deleteColor(@PathVariable int id) {
		Color c=colorJpaRepository.findById(id).get();
		if(colorJpaRepository.findById(id).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this don't has this color id !"  );
		}
		if(!c.getProduct().isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this color has been use in product !"  );
		}
		if (c.getProduct().isEmpty()) {
			colorJpaRepository.deleteById(id);
			return "delete success";
		}
		else
		return "delete fail";
	}
	@PutMapping("/admin/editcolor")
	public Color editColor(@RequestBody Color color) {
		Color old= colorJpaRepository.findById(color.getColorId()).get();
		if(!colorJpaRepository.findByColorName(color.getColorName()).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name has been use"  );
		}
		old.setColorName(color.getColorName());
		return colorJpaRepository.save(old);
	}
}
