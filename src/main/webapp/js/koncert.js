$(document).ready(function()
{
    var idKoncert,
        idKlub,
        nazwa_koncertu,
        ceny_biletow,
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
        idHiring = $(this).closest('tr').children().eq(0).text();
    });

    $("#delete-btn").on('click', function()
    {
        if(typeof idHiring != null && typeof idHiring != 'undefined' )
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
       idKlub= $this.eq(1).text();
       nazwa_koncertu = $this.eq(2).text();
       ceny_biletow = $this.eq(3).text();
       $inputsUpdate.eq(0).val(idKoncert);
       $inputsUpdate.eq(1).find('option[value='+idKlub+']').prop('selected', true);
       $inputsUpdate.eq(2).val(nazwa_koncertu);
       $inputsUpdate.eq(3).val(ceny_biletow);
    });

    $('#update-form').submit(function(e)
    {
        $updateAlert.removeClass('in');
        $updateAlert.text('');
        var newIdKoncert = $inputsUpdate.eq(0).val(),
            newIdKlub = $inputsUpdate.eq(1).val(),
            newNazwa_koncertu = $inputsUpdate.eq(2).val(),
            newCeny_biletow = $inputsUpdate.eq(3).val();
        if(idKoncert != '' && typeof idKoncert != 'undefined' && idKoncert == newIdKoncert)
        {
            if(newIdKlub == idKlub && nazwa_koncertu == newNazwa_koncertu && ceny_biletow == newCeny_biletow)
            {
                $('#update-modal').modal('hide');
            }
            else
            {
                doAjax('../rest/koncert/updateKoncert', 'PUT', '',
                {
                    idKoncert: newIdKoncert,
                    idKlub: newIdKlub,
                    nazwa_koncertu: newNazwa_koncertu,
                    ceny_biletow: newCeny_biletow

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
    	var idKlub= $('#select-klub-add').val(),
            nazwa_koncertu = $('#nazwa_koncertu').val();
            ceny_biletow = $('#ceny_biletow').val();

    	if(idKlub == '')
    	{
    		$addAlert.text('Nie wybrano klubu');
    		$addAlert.addClass('in');
    	}

    	else
    	{
    		doAjax('../rest/koncert/addKoncert', 'POST', '', { idKlub: idKlub, nazwa_koncertu: nazwa_koncertu, ceny_biletow: ceny_biletow})
    		    .success(function(response){ location.reload(true); });
    	}
    });

});