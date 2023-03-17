package int222.project.repositories;

import org.springframework.data.jpa.repository.JpaRepository;


import int222.project.models.Type;

public interface TypeJpaRepository extends JpaRepository<Type, Integer> {
	Type findByName(String name);


}
