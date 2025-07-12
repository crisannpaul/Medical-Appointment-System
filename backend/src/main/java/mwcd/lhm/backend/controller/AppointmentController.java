package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.BookRequest;
import mwcd.lhm.backend.model.*;
import mwcd.lhm.backend.repository.AppointmentRepository;
import mwcd.lhm.backend.repository.ClientRepository;
import mwcd.lhm.backend.repository.DoctorRepository;
import mwcd.lhm.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointments;
    private final ClientRepository clientRepository;
    private final DoctorRepository doctorRepository;
    private final AppointmentRepository appointmentRepo;

    @GetMapping("/available")
    public Map<String, Boolean> available(
            @RequestParam Long doctorId,
            @RequestParam
            @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
            Instant dateTime) {

//        List<Appointment> all = appointments.fetchAll();
//        System.out.println(all);

        boolean free = appointments.isSlotAvailable(doctorId, dateTime);
        return Map.of("available", free);
    }

    @GetMapping("/{id}")
    public Appointment get(@PathVariable Long id) {
        return appointments.get(id);
    }

//    @PostMapping
//    public Appointment book(@RequestBody Appointment a) {
//        return appointments.book(a);
//    }

    @PostMapping("/book")                       // POST /api/appointments/book
    public ResponseEntity<?> bookForCaller(@RequestBody BookRequest dto) {

        // 1. find or create client
        Client client = clientRepository.findByPhoneNumber(dto.clientPhone())
                .orElseGet(() -> {
                    Client c = Client.builder()
                            .username(dto.clientName())      // or another name field
                            .phoneNumber(dto.clientPhone())
                            .role(Role.CLIENT)
                            .mentions("")
                            .build();
                    return clientRepository.save(c);
                });

        // 2. doctor
        Doctor doc = doctorRepository.findById(dto.doctorId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Doctor not found"));

        // 3. availability check
        if (appointmentRepo.existsByDoctorAndStartAt(doc, dto.startAt())) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Slot already booked");
        }

        // 4. save appointment
        Appointment a = Appointment.builder()
                .doctor(doc)
                .client(client)
                .startAt(dto.startAt())
                .isFirst(true)
                .status(Status.BOOKED)
                .build();

        appointmentRepo.save(a);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{id}/status/{status}")
    public Appointment updateStatus(@PathVariable Long id,
                                    @PathVariable Status status) {
        return appointments.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void cancel(@PathVariable Long id) {
        appointments.cancel(id);
    }

    // optional: list by status & date window
    @GetMapping
    public List<Appointment> listByStatus(
            @RequestParam Status status,
            @RequestParam Instant from,
            @RequestParam Instant to) {
        return appointments.byStatusBetween(status, from, to);
    }
}
