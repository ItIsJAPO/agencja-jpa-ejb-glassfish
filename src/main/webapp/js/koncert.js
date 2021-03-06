$(document).ready(function()
{
    var idKoncert,
        nazwa_koncertu,
        ceny_biletow,
        idKlub,
        $updateAlert = $('#update-alert'),
        $inputsUpdate = $('#inputs-update').children(),
        $tbody = $('#hiring-tbody');

    $( '.form-date' ).datetimepicker( { format: 'YYYY-MM-DD' } );

    doAjax('../rest/koncert/getAllKoncerts', 'GET', 'JSON', '').then(
    function(response)
    {
        makeRowsInTable(response, $tbody);
    });

    doAjax('../rest/klub/getAllKlubs',  'GET', 'JSON', '').then(
    function(response)
    {
        createOptionSelect($('#select-klub-add'), response);
        createOptionSelect($inputsUpdate.eq(1), response);
    });


    $tbody.on('click', '.remove-row', function()
    {
        idKoncert = $(this).closest('tr').children().eq(0).text();
    });

    $("#delete-btn").on('click', function()
    {
        if(typeof idKoncert != null && typeof idKoncert != 'undefined' )
        {
            doAjax('../rest/koncert/deleteKoncert', 'DELETE', '', {idKoncert: idKoncert})
                .success(function(response){ location.reload(true); });
        }
    });

    $tbody.on('click', '.update-row', function()
    {
       var $this = $(this).closest('tr').children();
       $updateAlert.removeClass('in');
       $updateAlert.text('');
       $('#inputs-update select').children().prop('selected', false);
       idKoncert = $this.eq(0).text();
       nazwa_koncertu = $this.eq(1).text();
       ceny_biletow = $this.eq(2).text();
       idKlub= $this.eq(3).text();
       $inputsUpdate.eq(0).val(idKoncert);
       $inputsUpdate.eq(1).val(nazwa_koncertu);
       $inputsUpdate.eq(2).val(ceny_biletow);
       $inputsUpdate.eq(3).find('option[value='+idKlub+']').prop('selected', true);
    });

    $('#update-form').submit(function(e)
    {
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        var newIdKoncert = $inputsUpdate.eq(0).val(),
            newNazwa_koncertu = $inputsUpdate.eq(1).val(),
            newCeny_biletow = $inputsUpdate.eq(2).val();
            newIdKlub = $inputsUpdate.eq(3).val(),
        if(idKoncert != '' && typeof idKoncert != 'undefined' && idKoncert == newIdKoncert)
        {
            if(idKlub == newidKlub && nazwa_koncertu == newNazwa_koncertu && ceny_biletow == newCeny_biletow)
            {
                $('#update-modal').modal('hide');
            }
            else
            {
                doAjax('../rest/koncert/updateKoncert', 'PUT', '',
                {
                    idKoncert: newIdKoncert,
                    nazwa_koncertu: newNazwa_koncertu,
                    ceny_biletow: newCeny_biletow
                    idKlub: newIdKlub,

                 }).success(function(response){ location.reload(true); });
                $('#update-modal').modal('hide');
            }
            e.preventDefault();
        }
    });

    $('#add-btn').click(function()
    {
    	var $addAlert = $('#add-alert');
    	$addAlert.removeClass('in');
                               	$addAlert.text('');
        var nazwa_koncertu = $('#nazwa_koncertu').val();
            ceny_biletow = $('#ceny_biletow').val();
    	    idKlub= $('#select-klub-add').val(),

    	if(idKlub == '')
    	{
    		$addAlert.text('Nie wybrano klubu');
    		$addAlert.addClass('in');
    	}

    	else
    	{
    		doAjax('../rest/koncert/addKoncert', 'POST', '', { nazwa_koncertu: nazwa_koncertu, ceny_biletow: ceny_biletow, idKlub: idKlub})
    		    .success(function(response){ location.reload(true); });
    	}
    });

});