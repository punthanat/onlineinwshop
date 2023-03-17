package int222.project.controllers;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import int222.project.exceptions.AllException;
import int222.project.exceptions.ExceptionResponse;
import int222.project.exceptions.ExceptionResponse.ERROR_CODE;
import int222.project.models.OrderDetail;
import int222.project.models.Product;
import int222.project.models.User;
import int222.project.models.UserOrder;
import int222.project.repositories.UserOrderJpaRepository;
import int222.project.repositories.OrderDetailRepository;
import int222.project.repositories.ProductsJpaRepository;
import int222.project.repositories.UserJpaRepositories;

@RestController
public class OrderRestController {
	@Autowired
	UserOrderJpaRepository orderRepo;
	@Autowired
	UserJpaRepositories userRepo;
	@Autowired
	ProductsJpaRepository productRepo;
	@Autowired
	OrderDetailRepository orderDetailRepo;

	@GetMapping("/admin/getallorder")
	public List<UserOrder> getAllOrder() {
		return orderRepo.findAll();
	}

	// ทำ page
	@GetMapping("/user/getuserorder")
	public List<UserOrder> getUserOrder(Authentication authen, @RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "4") Integer pageSize,
			@RequestParam(defaultValue = "userOrderId") String sortBy) {
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy).descending());
		User user = userRepo.findByUserName(authen.getName()).get();

		Page<UserOrder> pageResult = orderRepo.findByUser(user, pageable);
//		if(!user.getUserName().equals(authen.getName())) {
//			throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please get your order" );
//			
//		}

		return pageResult.getContent();
	}

	// use try catch block
	@PostMapping("/user/addorder")
	public UserOrder addOrder(@RequestBody UserOrder order,Authentication authen) {
	List<OrderDetail> od =order.getOrderDetail();
	int q = 0;
	Product p;
	boolean hasProductDetail = false;
	if(order.getOrderDetail().isEmpty()) {
		throw new AllException(ExceptionResponse.ERROR_CODE.NOT_NULL, "order detail can not null ");
	}

	if(!order.getUser().getUserName().equals(authen.getName())) {
		throw new AllException(ExceptionResponse.ERROR_CODE.USER_NOT_MATCH, "please post your order" );
	}
//	UserOrder testUo= orderRepo.save(order);
	// loop check before this create uo
	for (int i = 0; i < od.size(); i++) {
		OrderDetail orderDetailTest= od.get(i);
		if(productRepo.findById(orderDetailTest.getProduct().getProductId()).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.HAS_BEEN_DELETE,"product has been delete");
		}
		p = productRepo.findById(od.get(i).getProduct().getProductId()).get();
		q = p.getQuantity()-od.get(i).getQuantity();
		 if(p.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.YOUR_PRODUCT, "cant order your product");
		} else if (q < 0 ) {
			throw new AllException(ExceptionResponse.ERROR_CODE.OUT_OF_STOCK,
					p.getName()+" out of stock");
		} else hasProductDetail = true;
	}
	if(!hasProductDetail) {
		throw new AllException(ExceptionResponse.ERROR_CODE.NOT_HAS_ORDERDETAIL, "orderdetail got problem");
	}
		UserOrder uo = orderRepo.save(order);
	
	for (int i = 0; i < od.size(); i++) {
		OrderDetail orderDetail= od.get(i);
		orderDetail.setUserOrder(uo);
		if(productRepo.findById(orderDetail.getProduct().getProductId()).isEmpty()) {
			throw new AllException(ExceptionResponse.ERROR_CODE.HAS_BEEN_DELETE,"product has been delete");
		}
		p = productRepo.findById(od.get(i).getProduct().getProductId()).get();
		q = p.getQuantity()-od.get(i).getQuantity();
		
		if(p.getUser().getUserName().equals(authen.getName())) {
			throw new AllException(ExceptionResponse.ERROR_CODE.YOUR_PRODUCT, "cant order your product");
		}
		
		
	if (q < 0 ) {
		throw new AllException(ExceptionResponse.ERROR_CODE.OUT_OF_STOCK,
				p.getName()+" out of stock");
	} else	{
		p.setQuantity(q);
		productRepo.save(p);
		orderDetailRepo.save(orderDetail);
		hasProductDetail = true;
			}
		}
	if(!hasProductDetail) {
		throw new AllException(ExceptionResponse.ERROR_CODE.NOT_HAS_ORDERDETAIL, "orderdetail got problem");
		}
//	}catch (AllException e) {
//		throw new AllException(e.getErrorCode(),e.getMessage());
	
		if(!hasProductDetail) {
			orderRepo.delete(uo);
		}
	
		
		return orderRepo.findById(uo.getUserOrderId()).get();
	}

	// ทำ page
	@GetMapping("/seller/order")
	public List<OrderDetail> getSellerOrder(Authentication authen, @RequestParam(defaultValue = "0") Integer pageNo,
			@RequestParam(defaultValue = "4") Integer pageSize,
			@RequestParam(defaultValue = "orderDetailId") String sortBy) {
		User u = userRepo.findByUserName(authen.getName()).get();
		List<Product> p = productRepo.findByUser(u);
		List<OrderDetail> od = new ArrayList<OrderDetail>();
		for (int i = 0; i < p.size(); i++) {
			od.addAll(orderDetailRepo.findByProduct(p.get(i)));
		}
		Pageable pageable = PageRequest.of(pageNo, pageSize, Sort.by(sortBy).descending());
		final int start = (int) pageable.getOffset();
		final int end = Math.min((start + pageable.getPageSize()), od.size());
		final Page<OrderDetail> page = new PageImpl<>(od.subList(start, end), pageable, od.size());
		return od;
	}
}
