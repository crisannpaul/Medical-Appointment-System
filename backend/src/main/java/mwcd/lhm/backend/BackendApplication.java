package mwcd.lhm.backend;

import mwcd.lhm.backend.model.*;
import mwcd.lhm.backend.repository.AppointmentRepository;
import mwcd.lhm.backend.repository.ClientRepository;
import mwcd.lhm.backend.repository.DoctorRepository;
import mwcd.lhm.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

@SpringBootApplication
@RestController
public class BackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(BackendApplication.class, args);
    }

    /** Seeds H2 (or any RDBMS) only when profile=dev */
    @Bean
//    @Profile("dev")
    CommandLineRunner demoData(UserRepository users,
                               DoctorRepository doctors,
                               ClientRepository clients,
                               PasswordEncoder encoder,
                               AppointmentRepository appts) {

        return args -> {

            /* ---------- Privileged staff ---------- */
            PrivilegedUser admin = PrivilegedUser.builder()
                    .username("admin")
                    .phoneNumber("555-0000")
                    .password(encoder.encode("admin123"))   // ← hash, not plain
                    .role(Role.ADMIN)
                    .build();

            PrivilegedUser receptionist = PrivilegedUser.builder()
                    .username("recept")
                    .phoneNumber("555-1111")
                    .password(encoder.encode("recept123"))
                    .role(Role.RECEPTIONIST)
                    .build();

            users.saveAll(List.of(admin, receptionist));

            /* ---------- Doctors ---------- */
            Doctor drHouse = Doctor.builder()
                    .username("house")
                    .phoneNumber("555-2222")
                    .password("{noop}pass")
                    .role(Role.DOCTOR)
                    .googleCalendarEmail("greg.house@clinic.com")
                    .googleAccessToken("demo-access-token")
                    .googleRefreshToken("demo-refresh-token")
                    .tokenExpiresAt(Instant.now().plusSeconds(3600))
                    .build();

            Doctor drCuddy = Doctor.builder()
                    .username("cuddy")
                    .phoneNumber("555-3333")
                    .password("{noop}pass")
                    .role(Role.DOCTOR)
                    .googleCalendarEmail("lisa.cuddy@clinic.com")
                    .googleAccessToken("demo-access-token")
                    .googleRefreshToken("demo-refresh-token")
                    .tokenExpiresAt(Instant.now().plusSeconds(3600))
                    .build();

            doctors.saveAll(List.of(drHouse, drCuddy));

            /* ---------- Clients ---------- */
            Client alice = Client.builder()
                    .username("alice")
                    .phoneNumber("555-4444")
                    .role(Role.CLIENT)
                    .mentions("Prefers morning slots")
                    .build();

            Client bob = Client.builder()
                    .username("bob")
                    .phoneNumber("555-5555")
                    .role(Role.CLIENT)
                    .mentions("Diabetic")
                    .build();

            Client carol = Client.builder()
                    .username("carol")
                    .phoneNumber("555-6666")
                    .role(Role.CLIENT)
                    .mentions("First-time visit")
                    .build();

            clients.saveAll(List.of(alice, bob, carol));

            /* ---------- Appointments ---------- */
            ZonedDateTime today9  = ZonedDateTime.now(ZoneId.of("Europe/Bucharest")).withHour(9).withMinute(0).withSecond(0).withNano(0);
            ZonedDateTime today12  = ZonedDateTime.now(ZoneId.of("Europe/Bucharest")).withHour(12).withMinute(0).withSecond(0).withNano(0);
            ZonedDateTime today11 = today9.plusHours(2).withNano(0);
            ZonedDateTime tomorrow10 = today9.plusDays(1).plusHours(1).withNano(0);

            Appointment a1 = Appointment.builder()
                    .doctor(drHouse)
                    .client(alice)
                    .startAt(today9.toInstant())
                    .isFirst(true)
                    .status(Status.BOOKED)
                    .build();

//            Appointment a4 = Appointment.builder()
//                    .doctor(drHouse)
//                    .client(alice)
//                    .startAt(today12.toInstant())
//                    .isFirst(true)
//                    .status(Status.BOOKED)
//                    .build();
//
//            Appointment a2 = Appointment.builder()
//                    .doctor(drHouse)
//                    .client(bob)
//                    .startAt(today11.toInstant())
//                    .isFirst(true)
//                    .status(Status.BOOKED)
//                    .build();
//
//            Appointment a3 = Appointment.builder()
//                    .doctor(drCuddy)
//                    .client(carol)
//                    .startAt(tomorrow10.toInstant())
//                    .isFirst(true)
//                    .status(Status.BOOKED)
//                    .build();
            appts.save(a1);
//            appts.saveAll(List.of(a1, a2, a3, a4));

            System.out.println("🌱 Demo data inserted — happy hacking!");
        };
    }

}