package int222.project.models;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "product","userOrder","comment"})
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userId;
	private String userName;
	private String password;
	private String address;
	private String tel;
	private String fullName;
	private String role;
	private String status;
	
	@OneToMany(orphanRemoval = true, mappedBy = "user")
	private List<Product> product;

	@OneToMany(orphanRemoval = true, mappedBy = "user")
	private List<UserOrder> userOrder;
	
	@OneToMany(orphanRemoval = true, mappedBy = "user")
	private List<Comment> comment;

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProducts(List<Product> product) {
		this.product = product;
	}

	public List<UserOrder> getUserOrder() {
		return userOrder;
	}

	public void setOrders(List<UserOrder> userOrder) {
		this.userOrder = userOrder;
	}

	public List<Comment> getComment() {
		return comment;
	}

	public void setComment(List<Comment> comment) {
		this.comment = comment;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}
	
	
}
