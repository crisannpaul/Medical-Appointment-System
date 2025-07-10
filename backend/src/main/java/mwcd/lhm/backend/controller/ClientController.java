package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.repository.ClientRepository;
import mwcd.lhm.backend.service.AppointmentService;
import mwcd.lhm.backend.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/clients")
public class ClientController {

    private final ClientService clients;
    private final AppointmentService appointments;

    @GetMapping("/{id}")
    public Client get(@PathVariable Long id) {
        return clients.get(id);
    }

    @GetMapping
    public List<Client> search(@RequestParam(required = false) String q) {
        return (q == null || q.isBlank())
                ? clients.searchByNote("")   // crude "list all"
                : clients.searchByNote(q);
    }

    @PostMapping
    public Client create(@RequestBody Client c) {
        return clients.create(c);
    }

    @PutMapping("/{id}")
    public Client update(@PathVariable Long id, @RequestBody Client c) {
        return clients.update(id, c);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        clients.delete(id);
    }

    /** full history */
    @GetMapping("/{id}/appointments")
    public List<Appointment> history(@PathVariable Long id) {
        return appointments.historyOf(clients.get(id));
    }
}
