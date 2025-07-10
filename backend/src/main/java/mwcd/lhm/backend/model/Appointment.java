package mwcd.lhm.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.time.LocalDateTime;

import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(
        name = "appointments",
        uniqueConstraints = @UniqueConstraint(           // ← now matches the FK name
                name = "uniq_doctor_start",
                columnNames = {"doctor_id", "start_at"}
        ))
public class Appointment {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /** Who the appointment is for */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "client_id",                   // do the same for client
            referencedColumnName = "id")
    private Client client;

    /** Which doctor */
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "doctor_id",                   // <<— explicit column name
            referencedColumnName = "id")
    private Doctor doctor;

    /** Start time (use end_at or duration if you need) */
    @Column(name = "start_at", nullable = false)
    private Instant startAt;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();

    /** Derived in code if you prefer; stored for speed */
    private boolean isFirst;

    @Enumerated(EnumType.STRING)
    private Status status = Status.BOOKED;
}