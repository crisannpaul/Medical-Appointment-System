// src/test/java/mwcd/lhm/backend/BackendApplicationIT.java
package mwcd.lhm.backend;

import com.fasterxml.jackson.databind.ObjectMapper;
import mwcd.lhm.backend.model.Client;
import mwcd.lhm.backend.model.Role;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests that hit the real HTTP layer (no sliced mocks).
 * Profile = dev so CommandLineRunner seeds demo data.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("dev")
class EndpointTest {

    @Autowired private MockMvc mvc;
    @Autowired private ObjectMapper json;

    /* ---------- READ endpoints populated by the seeder ---------- */

    @Test @DisplayName("GET /api/doctors returns the two demo doctors")
    void listDoctors() throws Exception {
        mvc.perform(get("/api/doctors"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", is(2)))
                .andExpect(jsonPath("$[*].username", containsInAnyOrder("house","cuddy")));
    }

    @Test @DisplayName("GET /api/clients returns the three demo clients")
    void listClients() throws Exception {
        mvc.perform(get("/api/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", is(4)))
                .andExpect(jsonPath("$[*].username",
                        containsInAnyOrder("alice","bob","carol")));
    }

    @Test @DisplayName("GET one appointment by id")
    void getAppointment() throws Exception {
        // the seeder inserts 3 appointments; id 1 should exist
        mvc.perform(get("/api/appointments/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.doctor.username", is("house")))
                .andExpect(jsonPath("$.client.username", is("alice")));
    }

    /* ---------- CREATE endpoint ---------- */

    @Test @DisplayName("POST /api/clients creates a new client")
    void createClient() throws Exception {
        Client dto = Client.builder()
                .username("dave")
                .phoneNumber("555-7777")
                .role(Role.CLIENT)
                .mentions("Allergic to penicillin")
                .build();

        mvc.perform(post("/api/clients")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(json.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNumber())
                .andExpect(jsonPath("$.username", is("dave")));

        // list endpoint should now return 4 clients
        mvc.perform(get("/api/clients"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()", is(4)));
    }
}
