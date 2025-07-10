package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Appointment;
import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.model.Doctor;
import mwcd.lhm.backend.model.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {

    /** quick conflict check for new bookings */
    boolean existsByDoctorAndStartAt(Doctor doctor, Instant startAt);

    /** list a doctor's appointments within a window (e.g. day view) */
    List<Appointment> findByDoctorAndStartAtBetweenOrderByStartAt(
            Doctor doctor, Instant from, Instant to);

    /** patient history */
    List<Appointment> findByClientOrderByStartAtDesc(Client client);

    /** first appointment flag helper */
    Optional<Appointment> findTop1ByClientOrderByStartAtAsc(Client client);

    /** bulk status lookup (e.g. all today's no-shows) */
    List<Appointment> findByStatusAndStartAtBetween(Status status,
                                                    Instant from,
                                                    Instant to);
}
