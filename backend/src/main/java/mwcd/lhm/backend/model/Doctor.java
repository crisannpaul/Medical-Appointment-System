package mwcd.lhm.backend.model;

import lombok.*;
import lombok.experimental.SuperBuilder;

import javax.persistence.*;
import java.time.Instant;

@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
@Entity
@Table(name = "doctors")
public class Doctor extends PrivilegedUser {

    /** Google account e-mail that owns the calendar */
    private String googleCalendarEmail;

    /** OAuth 2.0 access token (short-lived) */
    @Column(length = 2048)
    private String googleAccessToken;

    /** OAuth 2.0 refresh token (long-lived) */
    @Column(length = 2048)
    private String googleRefreshToken;

    /** When the current access token expires */
    private Instant tokenExpiresAt;
}
