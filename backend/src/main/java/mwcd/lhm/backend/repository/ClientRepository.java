package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Client;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findByMentionsContainingIgnoreCase(String phrase);
    Optional<Client> findByPhoneNumber(String phoneNumber);

}
