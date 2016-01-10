package com.agencja.rest;

import com.agencja.ZespolDAO;
import com.agencja.domain.Zespol;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;


@Stateless
@Path("/customer")
public class ZespolResource {

    @EJB
    private ZespolDAO zespolManager;

    @POST
    @Path("/addZespol")
    public Response addZespol(@FormParam("nazwa") String nazwa,
                                @FormParam("kraj") String kraj)
    {
        Zespol zespol = new Zespol();
        zespol.setNazwa(nazwa);
        zespol.setKraj(kraj);

        zespolManager.addZespol(zespol);

        return Response.status(Response.Status.CREATED).build();
    }

    @GET
    @Path("/getAllZespols")
    @Produces(MediaType.APPLICATION_JSON)
    public List<Zespol> getAllZespols()
    {
        return zespolManager.getAllZespols();
    }

    @GET
    @Path("/getZespol/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Zespol getZespolByID(@PathParam("id") Long id) {
        return zespolManager.getZespolByID(id);
    }

    @POST
    @Path("/updateZespol")
    public Response updateZespol(@FormParam("idZespol") long idZespol,
                                   @FormParam("nazwa") String nazwa,
                                   @FormParam("kraj") String kraj)
    {
        Zespol zespol = new Zespol();
        zespol.setIdZespol(idZespol);
        zespol.setNazwa(nazwa);
        zespol.setKraj(kraj);

        zespolManager.updateZespol(zespol);

        return Response.status(Response.Status.OK).build();
    }

    @POST
    @Path("/deleteZespol")
    public Response deleteCustomer(@FormParam("idZespol") long idZespol)
    {
        Zespol zespol = new Zespol();
        zespol.setIdZespol(idZespol);

        zespolManager.deleteZespol(zespol);

        return Response.status(Response.Status.OK).build();
    }

}
