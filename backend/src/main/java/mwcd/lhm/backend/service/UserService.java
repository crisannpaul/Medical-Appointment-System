package mwcd.lhm.backend.service;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.PrivilegedUser;
import mwcd.lhm.backend.model.Role;
import mwcd.lhm.backend.model.User;
import mwcd.lhm.backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService implements UserDetailsService {

    private final UserRepository users;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return users.findByUsername(username)
                .filter(u -> u instanceof PrivilegedUser)     // only staff can log in
                .map(u -> (PrivilegedUser) u)
                .orElseThrow(() -> new UsernameNotFoundException("No staff user " + username));
    }

    public User get(Long id) {
        return users.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(User.class, id));
    }

    public Optional<User> getByUsername(String username) {
        return users.findByUsername(username);
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
