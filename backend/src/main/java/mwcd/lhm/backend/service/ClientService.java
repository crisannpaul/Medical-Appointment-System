package mwcd.lhm.backend.service;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ClientService {

    private final ClientRepository clients;

    public Client get(Long id) {
        return clients.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Client.class, id));
    }

    public List<Client> searchByNote(String phrase) {
        return clients.findByMentionsContainingIgnoreCase(phrase);
    }

    @Transactional
    public Client create(Client c) {
        return clients.save(c);
    }

    @Transactional
    public Client update(Long id, Client patch) {
        Client c = get(id);
        c.setMentions(patch.getMentions());
        return clients.save(c);
    }

    @Transactional
    public void delete(Long id) {
        clients.deleteById(id);
    }
}
