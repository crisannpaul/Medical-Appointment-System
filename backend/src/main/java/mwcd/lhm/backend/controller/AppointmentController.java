package mwcd.lhm.backend.controller;

import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Status;
import mwcd.lhm.backend.repository.AppointmentRepository;
import mwcd.lhm.backend.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/appointments")
public class AppointmentController {

    private final AppointmentService appointments;

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

    @PostMapping
    public Appointment book(@RequestBody Appointment a) {
        return appointments.book(a);
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
