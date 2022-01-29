package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Client;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ClientRepository extends CrudRepository<Client, Long> {

    Client findClientById(Integer id);

    List<Client> findClientByEmail(String email);

    List<Client> findClientByEmailAndPassword(String email, String password);

}
