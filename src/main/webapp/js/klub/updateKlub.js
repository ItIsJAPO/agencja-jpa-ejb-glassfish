$(document).ready(function()
{
    var id = window.location.search.replace("?id=", "");

    document.getElementById('idProductID').value = id;

    $.get("/agencja/rest/klub/getKlub/" + id, function(data, textStatus)
    {
       document.getElementById('id').innerHTML = data.idKlub;
       document.getElementById('miasto').innerHTML = data.miasto;
       document.getElementById('nazwa').innerHTML = data.nazwa;
       document.getElementById('ilosc_miejsc').innerHTML = data.ilosc_miejsc;
    });
});