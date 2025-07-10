package mwcd.lhm.backend.service;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.Role;
import mwcd.lhm.backend.model.User;
import mwcd.lhm.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository users;

    public User get(Long id) {
        return users.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, id));
    }

    public List<User> listByRole(Role role) {
        return users.findByRole(role);
    }

    @Transactional
    public User create(User user) {
        return users.save(user);
    }

    @Transactional
    public User update(Long id, User patch) {
        User u = get(id);
        u.setUsername(patch.getUsername());
        u.setPhoneNumber(patch.getPhoneNumber());
        u.setRole(patch.getRole());
        return users.save(u);
    }

    @Transactional
    public void delete(Long id) {
        users.deleteById(id);
    }
}
