package int222.project.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.models.ExtendService;
import int222.project.models.Product;
import int222.project.models.Type;
import int222.project.models.User;
import int222.project.repositories.ProductsJpaRepository;
import int222.project.repositories.TypeJpaRepository;
import int222.project.repositories.UserJpaRepositories;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
public class ProductsRestController {
	@Autowired
	ProductsJpaRepository productsJpaRepository;
	@Autowired
	TypeJpaRepository typeRepo;
	@Autowired
	UserJpaRepositories userRepo;
	@Autowired
	ExtendService ES;

	@GetMapping("/products")
	public List<Product> getAllProduct() {
		return productsJpaRepository.findAll();
	};

	@GetMapping("/products/{id}")
	public Product show(@PathVariable int id) {
		Optional<Product> productO = productsJpaRepository.findById(id);
		if (productO.isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.DOES_NOT_FIND_ID,
					"id: {" + id + "} Does not fine Id!!");
		}
		if(productO.get().getUser().getStatus().equals("inactive")) {
			throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL,
					"this account inactive please contact the admin!!"  );
		}
		return productO.orElse(null);
	};

	@PostMapping("seller/products/add")
	public Product post(@RequestParam("imageFile") MultipartFile imageFile,@RequestPart Product product,Authentication authen) {
		
		
		if(!product.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please post your product" );
		}
		if (productsJpaRepository.existsById(product.getProductId())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.PRODUCT_ALREADY_EXIST,
					"id: {" + product.getProductId() + "} already exist !!");
		}
//		if (productsJpaRepository.findByName(product.getName()) != null) {
//			throw new AllException(ExceptionResponse.ERROR_CODE.DUPICATE_IN_PRODUCTS,
//					"Name: {" + product.getName() + "} dupicate!!");
//		}
		if (imageFile.getContentType().equals("image/png")) {
			product.setImageName(ES.randomString(3)+product.getName() + ".png");
		} else if (imageFile.getContentType().equals("image/jpeg")) {
			product.setImageName(ES.randomString(3)+product.getName() + ".jpg");
		} else {
			throw new AllException(ExceptionResponse.ERROR_CODE.CAN_NOT_UPLOAD_THIS_FILETYPE,
					"can upload png and jpg only");
		}
		productsJpaRepository.save(product);
		try {
			ES.saveImage(imageFile, product.getImageName());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return product;
	};

	@DeleteMapping("seller/products/{id}")
	public String delete(@PathVariable int id,Authentication authen) {
		Product product = productsJpaRepository.findById(id).get();
		if(!product.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please delete your product" );
		}
		if (!product.getOrderDetails().isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.CAN_NOT_DELETE, "product has been ordered" );
		}
		productsJpaRepository.deleteById(id);
		try {
			ES.deleteImage(product.getImageName());
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println("delete error");
		}

		return "Delete Success";
	};

	@PutMapping("seller/products/put/{id}")
	public Product put(		@RequestPart Product product, @PathVariable int id,
			@RequestParam(value = "imageFile", required = false) MultipartFile imageFile,Authentication authen) {
		if(!product.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please put your product" );
		}
		if (productsJpaRepository.findById(id).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.DOES_NOT_FIND_ID,
					"id: {" + id + "} Does not fine Id!!");
		}
//		if (productsJpaRepository.findByName(product.getName()) != null
//				&& productsJpaRepository.findByName(product.getName()).getProductId() != product.getProductId()) {
//			throw new AllException(ExceptionResponse.ERROR_CODE.DUPICATE_IN_PRODUCTS,
//					"Name: {" + product.getName() + "} dupicate!!");
//		}
		Optional<Product> optional = productsJpaRepository.findById(id);
		if (optional.isPresent()) {
			Product existedProduct = optional.get();
			Product existedProduct2 = optional.get();
			existedProduct.setName(product.getName());
			existedProduct.setDescription(product.getDescription());
			existedProduct.setPrice(product.getPrice());
			existedProduct.setQuantity(product.getQuantity());
			existedProduct.setType(product.getType());
			existedProduct.setColor(product.getColor());
			if (imageFile != null) {
				try {
					ES.deleteImage(existedProduct2.getImageName());
					if (imageFile.getContentType().equals("image/png")) {
						existedProduct.setImageName(ES.randomString(3)+product.getName() + ".png");
					} else if (imageFile.getContentType().equals("image/jpeg")) {
						existedProduct.setImageName(ES.randomString(3)+product.getName() + ".jpg");
					} else {
						throw new AllException(ExceptionResponse.ERROR_CODE.CAN_NOT_UPLOAD_THIS_FILETYPE,
								"can upload png and jpg only");
					}
					ES.saveImage(imageFile, existedProduct.getImageName());
				} catch (Exception e) {
					e.printStackTrace();
					System.out.println("put error");
				}
			}
			return productsJpaRepository.save(existedProduct);
		} else 
		return null;
	};

	@GetMapping("/products/page")
	public List<Product> productWithPage(@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "4") Integer pageSize, @RequestParam(defaultValue = "price") String sortBy) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy));
		Page<Product> pageResult = productsJpaRepository.findAll(pageable);
		return pageResult.getContent();
	}
	
	@GetMapping("/products/search")
	public List<Product> searchProduct(@RequestParam(required = false) String searchText,@RequestParam(required = false) String type,
			@RequestParam(defaultValue = "4") Integer pageSize,@RequestParam(defaultValue = "0") Integer pageNo
			,@RequestParam(defaultValue = "productId") String sortBy, @RequestParam(defaultValue = "yes") String isdescending){
		
		
		Pageable pageable ;
		if(isdescending.equals("yes")) {
			pageable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy).descending());
		}
		else {
		 pageable = PageRequest.of(pageNo, pageSize,Sort.by(sortBy));
		}
		Page<Product> pageResult = null; 
		Type t = typeRepo.findByName(type);
		if(type == null && searchText != null){
		pageResult = productsJpaRepository.searchByNameLike(searchText,pageable);
		} 
		else 
		if(searchText == null && type != null) {
			pageResult =  productsJpaRepository.findByType(t,pageable);
		}else 
		if(searchText != null && type !=null) {
			pageResult = productsJpaRepository.searchByNameLikeAndFilter(searchText, t ,pageable);
			
		}
		List<Product> filterProduct = pageResult.getContent();
		List<Product>  modiList = new ArrayList<Product>(filterProduct);
		for (int i = 0; i < modiList.size() ; i++) {
			
			if(modiList.get(i) == null) {
				break;
			}
			if(modiList.get(i).getUser().getStatus().equals("inactive")) {
				modiList.remove(i);
				i= i-1;
			}
			

		}
		return modiList;
		
	}
	@GetMapping("/seller/products/sellerproduct/{name}")
	public List<Product> getSellerProduct(@PathVariable String name){
		User seller = userRepo.findByUserName(name).get();
		return productsJpaRepository.findByUser(seller);
	}
}
