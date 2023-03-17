package int222.project.repositories;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import int222.project.models.Product;
import int222.project.models.Type;
import int222.project.models.User;

public interface ProductsJpaRepository extends JpaRepository<Product, Integer> {
	List<Product> findByUser(User user);
	Product findByName(String name);
	@Query("SELECT p FROM Product p WHERE p.name LIKE %:name%")
	Page<Product> searchByNameLike(@Param("name") String name ,Pageable pageable); 
	Page<Product> findByType(Type type,Pageable pageable);
	@Query("SELECT p FROM Product p WHERE p.name LIKE %:name% and p.type = :type")
	Page<Product> searchByNameLikeAndFilter(@Param("name") String name,@Param("type") Type type,Pageable pageable); 
}
