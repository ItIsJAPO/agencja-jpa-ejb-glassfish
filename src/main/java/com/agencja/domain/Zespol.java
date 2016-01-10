package com.agencja.domain;

public class Zespol {

    private static int ZespolID = 0;
    private int ID;
    private String nazwa;
    private String kraj;

    public Zespol() {
    }


    public Zespol(String nazwa, String kraj) {
        super();
        this.ID = ++ZespolID;
        this.nazwa = nazwa;
        this.kraj = kraj;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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

