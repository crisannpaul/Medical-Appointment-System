package mwcd.lhm.backend.controller;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.Role;
import mwcd.lhm.backend.model.User;
import mwcd.lhm.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")   // dev only; tighten for prod
public class UserController {

    private final UserService users;

    @GetMapping("/{id}")
    public User get(@PathVariable Long id) {
        return users.get(id);
    }

    @GetMapping
    public List<User> all(@RequestParam(required = false) Role role) {
        return role == null ? users.listByRole(null) : users.listByRole(role);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public User create(@RequestBody User u) {
        return users.create(u);
    }

    @PutMapping("/{id}")
    public User update(@PathVariable Long id, @RequestBody User patch) {
        return users.update(id, patch);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id) {
        users.delete(id);
    }
}
