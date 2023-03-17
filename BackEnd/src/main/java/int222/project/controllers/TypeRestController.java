package int222.project.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.models.Type;
import int222.project.repositories.TypeJpaRepository;

@RestController
public class TypeRestController {
	@Autowired
	TypeJpaRepository typeJpaRepository;

	@GetMapping("/types")
	public List<Type> getAllBrand() {
		return typeJpaRepository.findAll();
	};

	@GetMapping("/type/{typeId}")
	public Type getBrand(@PathVariable int typeId) {
		return typeJpaRepository.findById(typeId).orElse(null);
	};
	//edit add เช็คชื่อซ้ำ
	@PostMapping("/admin/addtype")
	public Type addType(@RequestBody Type type) {
		if(typeJpaRepository.findByName(type.getName())!= null) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name has been use"  );
		}
		return typeJpaRepository.save(type);
	}
	@DeleteMapping("/admin/deletetype/{id}")
	public String deleteType(@PathVariable int id) {
		Type type = typeJpaRepository.findById(id).get();
		if(typeJpaRepository.findById(id).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this don't has this type id !"  );
		}
		if(!type.getProducts().isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this type has been use in product !"  );
		}
		typeJpaRepository.deleteById(id);
		
		return "delete success" ;
	}
	@PutMapping("/admin/edittype/{id}")
	public Type editeType(@RequestBody Type type ) {
		Type old = typeJpaRepository.findById(type.getTypeId()).get();
		if(typeJpaRepository.findByName(type.getName())!= null) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NAME_DUPLICATE,
					"this name has been use"  );
		}
		old.setName(type.getName());
		return typeJpaRepository.save(old);
	}
	
}
