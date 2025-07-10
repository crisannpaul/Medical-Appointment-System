package mwcd.lhm.backend.service;

import mwcd.lhm.backend.model.Doctor;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.repository.DoctorRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DoctorService {

    private final DoctorRepository doctors;

    public Doctor get(Long id) {
        return doctors.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(Doctor.class, id));
    }

    public List<Doctor> list() {
        return doctors.findAll();
    }

    @Transactional
    public Doctor create(Doctor d) {
        return doctors.save(d);
    }

    @Transactional
    public Doctor update(Long id, Doctor patch) {
        Doctor d = get(id);
        d.setGoogleCalendarEmail(patch.getGoogleCalendarEmail());
        d.setGoogleAccessToken(patch.getGoogleAccessToken());
        d.setGoogleRefreshToken(patch.getGoogleRefreshToken());
        d.setTokenExpiresAt(patch.getTokenExpiresAt());
        return doctors.save(d);
    }

    @Transactional
    public void delete(Long id) {
        doctors.deleteById(id);
    }
}
