$('document').ready(function() {


    var nombreUs = $('#nombreUser').text();

    $('#notOk').click(function() {

        window.location.replace("/seleccion");
    });

    $('#ok').click(function() {

        // navigator.geolocation.getCurrentPosition(function(position) {

        //     var data = {
        //         disponible: true,
        //         timestamp: Date.now(),
        //         user: nombre, //cambiar para que tome de un cookie
        //         ubicacion: {
        //             latitude: position.coords.latitude,
        //             longitude: position.coords.longitude
        //         },
        //     };

        var data = {
            nombre: nombreUs
        }

        $.ajax({
            type: 'POST', // el get tiene un limite para enviar
            url: '/api/avisar',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                authorization: true //despues poner otra cosa/codigo
            },
            success: function(res) {
                console.log(res);
                // if (err) {
                //     console.log("Se devolvíó el error: " + err);
                //     location.reload();
                //     return;
                // }; // Confirmar/Error y redirigir al perfil del usuario
                window.location.replace("/"); // lo puse para que redirija hacia la homepage pero habría que pensar a donde queremos mandar al usuario
            },
            error: function(err) {
                console.log('El error fue: ' + err);
            }
        });

    });



});