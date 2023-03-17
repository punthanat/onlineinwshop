package int222.project.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import int222.project.models.User;

public interface UserJpaRepositories extends JpaRepository<User, Integer>{
	Optional<User> findByUserName(String username);
}
