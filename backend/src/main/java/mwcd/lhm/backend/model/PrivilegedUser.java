package mwcd.lhm.backend.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "privileged_users")
public class PrivilegedUser extends User {

    private String password;   // store a BCrypt hash, not plain text
}
