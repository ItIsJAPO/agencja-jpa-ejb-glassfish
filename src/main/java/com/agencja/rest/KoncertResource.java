package com.agencja.rest;

import com.agencja.KlubDAO;
import com.agencja.KoncertDAO;
import com.agencja.domain.*;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import java.util.List;

@Stateless
@Path("/koncert")
public class KoncertResource {

    @EJB
    private KlubDAO klubManager;

    @EJB
    private KoncertDAO koncertManager;

    @POST
    @Path("/addKoncert")
    public Response addKoncert(@FormParam("nazwa_koncertu") String nazwa_koncertu,
                               @FormParam("ceny_biletow") double ceny_biletow,
                               @FormParam("klub") String klub) {
        Long klubID = Long.parseLong(klub.substring(0, klub.indexOf('.')));

        Koncert koncert = new Koncert();
        koncert.setKlub(klubManager.getKlubByID(klubID));
        koncert.setNazwa_koncertu(nazwa_koncertu);
        koncert.setCeny_biletow(ceny_biletow);

        koncertManager.addKoncert(koncert);
        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/getAllKoncerts")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Koncert> getAllKoncerts() {
        return koncertManager.getAllKoncerts();
    }


    @GET
    @Path("/getKoncert/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Koncert getKoncertByID(@PathParam("id") Long id) {
        return koncertManager.getKoncertByID(id);
    }

    @POST
    @Path("/updateKoncert")
    public Response updateKoncert(@FormParam("nazwa_koncertu") String nazwa_koncertu,
                                  @FormParam("ceny_biletow") double ceny_biletow,
                                  @FormParam("klub") String klub)
    {
        Long klubID = Long.parseLong(klub.substring(0, klub.indexOf('.')));

        Koncert koncert = new Koncert();
        koncert.setKlub(klubManager.getKlubByID(klubID));
        koncert.setNazwa_koncertu(nazwa_koncertu);
        koncert.setCeny_biletow(ceny_biletow);

        koncertManager.updateKoncert(koncert);
        return Response.status(Response.Status.CREATED).build();
    }

    @POST
    @Path("/deleteKoncert")
    public Response deleteKoncert(@FormParam("idKoncert") long idKoncert)
    {
        Koncert koncert = new Koncert();
        koncert.setIdKoncert(idKoncert);

        koncertManager.deleteKoncert(koncert);

        return Response.status(Response.Status.OK).build();
    }


}
