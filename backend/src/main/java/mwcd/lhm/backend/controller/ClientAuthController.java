package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/client/auth")
public class ClientAuthController {

    @Autowired
    private ClientRepository clientRepository;

    @PostMapping("/register")
    public String registerClient(
            @RequestParam String name,
            @RequestParam String email,
            @RequestParam String password,
            @RequestParam String record
    ) {
        // check if email already registered
        List<Client> matches = clientRepository.findClientByEmail(email);
        if (matches.size() > 0)
            return "Email already exists. Please login.";

        // create client object with parameter details
        var client = new Client();
        client.setName(name);
        client.setEmail(email);
        client.setPassword(password);
        client.setRecord(record);

        // add client object to database
        clientRepository.save(client);

        return "You have been registered. Please login.";
    }

    @PostMapping("/login")
    public Client loginClient(
            @RequestParam String email,
            @RequestParam String password
    ) {
        // all client accounts that match email and password
        List<Client> matches = clientRepository.findClientByEmailAndPassword(email, password);

        // if the matches isn't equal to 1, return empty client object
        if (matches.size() != 1)
            return new Client();

        // returning first from all matches, as there should be only one due to unique email registration only
        return matches.get(0);
    }

}