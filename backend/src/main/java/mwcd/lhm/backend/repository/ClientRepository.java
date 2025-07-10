package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Client;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository<Client, Long> {

    List<Client> findByMentionsContainingIgnoreCase(String phrase);
}
