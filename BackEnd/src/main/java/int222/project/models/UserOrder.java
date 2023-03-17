package int222.project.models;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;



@Entity
@JsonIgnoreProperties({ "hibernateLazyInitializer", "handler" })
public class UserOrder {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int userOrderId;
	private Date date;
	
	@OneToMany(orphanRemoval = true, mappedBy = "userOrder")
	private List<OrderDetail> orderDetail ;
	
	@ManyToOne(fetch = FetchType.LAZY, optional = false)
	@JoinColumn(name = "userId", nullable = false)
	private User user;

	public int getUserOrderId() {
		return userOrderId;
	}

	public void setUserOrderId(int userOrderId) {
		this.userOrderId = userOrderId;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public List<OrderDetail> getOrderDetail() {
		return orderDetail;
	}

	public void setOrderDetails(List<OrderDetail> orderDetail) {
		this.orderDetail = orderDetail;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
	
	
}
	