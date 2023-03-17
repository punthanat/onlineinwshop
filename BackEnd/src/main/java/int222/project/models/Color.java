package int222.project.models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;


@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler", "product","orderDetails"})
public class Color {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int colorId;
	private String colorName;

	@ManyToMany()
	@JoinTable(name = "HaveColor", joinColumns = @JoinColumn(name = "colorId"), inverseJoinColumns = @JoinColumn(name = "productId"))
	private List<Product> product;

	@OneToMany(orphanRemoval = true,mappedBy = "color")
	private List<OrderDetail> orderDetails;

	public int getColorId() {
		return colorId;
	}

	public void setColorId(int colorId) {
		this.colorId = colorId;
	}

	public String getColorName() {
		return colorName;
	}

	public void setColorName(String colorName) {
		this.colorName = colorName;
	}

	public List<Product> getProduct() {
		return product;
	}

	public void setProduct(List<Product> product) {
		this.product = product;
	}

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	

	
}
