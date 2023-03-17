package int222.project.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import int222.project.models.Color;

public interface ColorJpaRepository extends JpaRepository<Color, Integer> {
	Optional<Color> findByColorName(String name);
}
