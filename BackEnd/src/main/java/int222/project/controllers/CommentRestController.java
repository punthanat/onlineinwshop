package int222.project.controllers;

import java.util.List;

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
import org.springframework.web.bind.annotation.RestController;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.models.Comment;
import int222.project.models.Product;
import int222.project.repositories.CommentJpaRepository;
import int222.project.repositories.ProductsJpaRepository;
import int222.project.repositories.UserJpaRepositories;

@RestController
public class CommentRestController {
	@Autowired
	CommentJpaRepository commentJpaRepository;
	@Autowired
	ProductsJpaRepository productRepo;
	@Autowired
	UserJpaRepositories userRepo;
//	@GetMapping("/allcomments")
//	public List<Comment> getAllComment() {
//		return commentJpaRepository.findAll();
//	}

	@GetMapping("product/{productId}/comment")
	public List<Comment> getComment(@PathVariable int productId,
			@RequestParam(defaultValue = "4") Integer pageSize,@RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "commentId") String sortBy) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy).descending());
		Page<Comment>  pageResult = commentJpaRepository.findByProduct(productRepo.findById(productId).get(), pageable);
		
		return pageResult.getContent();
	}
	@PostMapping("/user/addcomment")
	public Comment addCommment(@RequestBody Comment comment,Authentication authen) {
		Product p = productRepo.findById(comment.getProduct().getProductId()).get(); 
		if(!comment.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please post your comment" );
		}
		if(p.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.YOUR_PRODUCT,"can not comment your product");
		}
		return commentJpaRepository.save(comment);
		
	}
	@PutMapping("/user/editcomment")
	public Comment editComment(@RequestBody Comment comment,Authentication authen) {
		Product p = productRepo.findById(comment.getProduct().getProductId()).get(); 
		if(!comment.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please put your comment" );
		}
		if(p.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.YOUR_PRODUCT,"can not comment your product");
		}
		Comment c = commentJpaRepository.findById(comment.getCommentId()).get();
		c.setContent(comment.getContent());
		c.setProduct(comment.getProduct());
		c.setUser(comment.getUser());
		return commentJpaRepository.save(c);
	}
	@DeleteMapping("/user/commentdelete/{id}")
	public String deleteComment(@PathVariable int id,Authentication authen) {
		Comment comment = commentJpaRepository.findById(id).get();
		if(!comment.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please delete  your comment" );
		}
		commentJpaRepository.deleteById(id);
		return "delete success";
	}
	
	
}
