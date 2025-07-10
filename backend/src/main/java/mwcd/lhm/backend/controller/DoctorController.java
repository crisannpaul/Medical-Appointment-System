package mwcd.lhm.backend.controller;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.service.AppointmentService;
import mwcd.lhm.backend.service.DoctorService;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/doctors")
public class DoctorController {

    private final DoctorService doctors;
    private final AppointmentService appointments;

    @GetMapping("/{id}")
    public Doctor get(@PathVariable Long id) {
        return doctors.get(id);
    }

    @GetMapping
    public List<Doctor> all() {
        return doctors.list();
    }

    @PostMapping
    public Doctor create(@RequestBody Doctor d) {
        return doctors.create(d);
    }

    @PutMapping("/{id}")
    public Doctor update(@PathVariable Long id, @RequestBody Doctor d) {
        return doctors.update(id, d);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        doctors.delete(id);
    }

    /** calendar slice */
    @GetMapping("/{id}/appointments")
    public List<Appointment> calendar(
            @PathVariable Long id,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant from,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) Instant to) {

        Doctor doc = doctors.get(id);
        return appointments.byDoctorBetween(doc, from, to);
    }
}
