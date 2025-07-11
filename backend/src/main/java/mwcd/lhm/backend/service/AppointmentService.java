package mwcd.lhm.backend.service;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.model.Status;
import mwcd.lhm.backend.repository.AppointmentRepository;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AppointmentService {

    private final AppointmentRepository appointments;
    private final DoctorService doctors;

    /** true if no appointment collides with doctor+startAt */
    public boolean isSlotAvailable(Long doctorId, Instant startAt) {
        Doctor doc = doctors.get(doctorId);
        return !appointments.existsByDoctorAndStartAt(doc, startAt);
    }

    /** list calendar slice for a doctor */
    public List<Appointment> byDoctorBetween(Doctor doc, Instant from, Instant to) {
        return appointments.findByDoctorAndStartAtBetweenOrderByStartAt(doc, from, to);
    }

    /** visit history for a client */
    public List<Appointment> historyOf(Client client) {
        return appointments.findByClientOrderByStartAtDesc(client);
    }

    @Transactional
    public Appointment book(Appointment a) {
        a.setStartAt(a.getStartAt().truncatedTo(ChronoUnit.MINUTES));


        if (appointments.existsByDoctorAndStartAt(a.getDoctor(), a.getStartAt())) {
            throw new IllegalStateException("Doctor already booked at that time");
        }
        // first-visit flag
        appointments.findTop1ByClientOrderByStartAtAsc(a.getClient())
                .ifPresent(first -> a.setFirst(false));
        return appointments.save(a);
    }

    @Transactional
    public Appointment updateStatus(Long id, Status status) {
        Appointment appt = appointments.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Appointment.class, id));
        appt.setStatus(status);
        return appointments.save(appt);
    }

    @Transactional
    public void cancel(Long id) {
        appointments.deleteById(id);
    }

    public Appointment get(Long id) {
        return appointments.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Appointment.class, id));
    }

    public List<Appointment> fetchAll() {
        return appointments.findAll();
    }

    /** List by status within a period (calendar/report use-case) */
    public List<Appointment> byStatusBetween(Status status,
                                             Instant from,
                                             Instant to) {
        return appointments.findByStatusAndStartAtBetween(status, from, to);
    }
}
