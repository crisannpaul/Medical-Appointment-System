package mwcd.lhm.backend.model;

import jakarta.persistence.*;


import lombok.*;
import lombok.experimental.SuperBuilder;

import jakarta.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "clients")
public class Client extends User {

    /** Extra notes the doctor/receptionist wants to remember */
    @Column(length = 1024)
    private String mentions;
}
