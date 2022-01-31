package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@CrossOrigin
@RequestMapping("/client/profile")
public class ClientProfileController {

    @Autowired
    private ClientRepository clientRepository;

    @GetMapping("/list")
    public Iterable<Client> getClients() {
        return clientRepository.findAll();
    }

    @GetMapping("/view/{id}")
    public Client findClientById(@PathVariable Integer id) {
        return clientRepository.findClientById(id);
    }

    @PatchMapping("/update/{id}")
    public Client updateClientById(
            // select user to update from path var
            @PathVariable Integer id,
            // updates are provided as request params
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String password,
            @RequestParam(required = false) String record
    ) {
        // getting current client object
        var client = clientRepository.findClientById(id);

        // updating client details based on non-null passed parameters
        client.setName(Objects.requireNonNullElse(name, client.getName()));
        client.setPassword(Objects.requireNonNullElse(password, client.getPassword()));
        client.setRecord(Objects.requireNonNullElse(record, client.getRecord()));

        // saving object back into repo (indexed by the immutable id field)
        clientRepository.save(client);

        return client;
    }

}
