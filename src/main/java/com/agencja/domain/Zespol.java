package com.agencja.domain;

import org.codehaus.jackson.annotate.JsonIgnore;
import javax.persistence.*;


@Entity
@Table (name = "Zespol")
@NamedQueries({
        @NamedQuery(name = "zespol.getAll", query = "Select z from Zespol z"),
        @NamedQuery(name = "zespol.getByID", query = "Select z from Zespol z where z.idZespol = :idZespol"),
})

public class Zespol {

    private long idZespol;
    private String nazwa;
    private String kraj;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public long getIdZespol() {
        return idZespol;
    }
    public void setIdZespol(long idZespol) {
        this.idZespol = idZespol;
    }

    public String getNazwa() {
        return nazwa;
    }
    public void setNazwa(String nazwa) {
        this.nazwa = nazwa;
    }

    public String getKraj() {
        return kraj;
    }
    public void setKraj(String kraj) {
        this.kraj = kraj;
    }

}

