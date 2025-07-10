package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Role;
import mwcd.lhm.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    Optional<User> findByPhoneNumber(String phoneNumber);

    List<User> findByRole(Role role);
}
