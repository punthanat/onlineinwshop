package int222.project.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import int222.project.models.OrderDetail;
import int222.project.models.Product;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, Integer>{
List<OrderDetail> findByProduct(Product product);
}
