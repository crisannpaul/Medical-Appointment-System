package mwcd.lhm.backend;

import java.time.Instant;

public record BookRequest(
        Long doctorId,
        String clientName,
        String clientPhone,
        Instant startAt
) {}
