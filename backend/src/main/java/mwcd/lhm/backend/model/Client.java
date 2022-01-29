package mwcd.lhm.backend.model;

import javax.persistence.*;

@Entity
@SequenceGenerator(name="CLIENT_SEQ", sequenceName="client_sequence")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="CLIENT_SEQ")
    private Integer id;

    private String name;
    private String email;
    private String password;
    private String record;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRecord() {
        return record;
    }

    public void setRecord(String record) {
        this.record = record;
    }
}
