package mwcd.lhm.backend.repository;

import mwcd.lhm.backend.model.Appointment;
import org.springframework.data.repository.CrudRepository;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDateTime;
import java.util.List;

@RequestMapping("/appointment")
public interface AppointmentRepository extends CrudRepository<Appointment, Long> {

    Appointment findAppointmentById(Integer id);

    List<Appointment> findAppointmentBySchedule(LocalDateTime schedule);

}
