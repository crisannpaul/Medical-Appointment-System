package mwcd.lhm.backend.controller;

import lombok.RequiredArgsConstructor;
import mwcd.lhm.backend.model.PrivilegedUser;
import mwcd.lhm.backend.security.JwtResponse;
import mwcd.lhm.backend.security.JwtTokenUtil;
import mwcd.lhm.backend.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService userService;
    private final PasswordEncoder encoder;
    private final JwtTokenUtil jwt;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> login(@RequestBody Map<String,String> body) {

        String username = body.get("username");
        String rawPass  = body.get("password");

        PrivilegedUser u = (PrivilegedUser) userService.getByUsername(username)    // you implement this
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.UNAUTHORIZED, "Bad credentials"));

        if (!encoder.matches(rawPass, u.getPassword())) {
            throw new ResponseStatusException(
                    HttpStatus.UNAUTHORIZED, "Bad credentials");
        }

        String token = jwt.generateToken(u);                // same util as before
        return ResponseEntity.ok(new JwtResponse(token));
    }
}

