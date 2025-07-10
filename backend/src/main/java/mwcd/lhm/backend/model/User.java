package mwcd.lhm.backend.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "users")
@Inheritance(strategy = InheritanceType.JOINED)
public class User {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    private String firstName;

    private String lastName;

    private String phoneNumber;

    @Enumerated(EnumType.STRING)
    private Role role;
}
