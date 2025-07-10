package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DoctorRepository extends JpaRepository<Doctor, Long> {

    Optional<Doctor> findByGoogleCalendarEmail(String googleCalendarEmail);
}
