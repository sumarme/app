$(document).ready(function() {
    var ubicacion;
    // var lastTime = 0;
    // var dialog = document.getElementById('dialog');
    // dialog.showModal();

    // $('#ingresarBtn').on('click', function() {
    //     dialog.close();
    //     $('#userName').text($('#userInput').val());
    // });

    $('#postularme').on("submit", function(event) {
        // Evitar el refresh por default
        event.preventDefault();
        // Obtener ubicacion
        waitingDialog.show();

        navigator.geolocation.getCurrentPosition(function(position) {
            // hacer POST a /postularme
            $.ajax({
                type: 'POST',
                url: '/api/postularme',
                data: JSON.stringify({
                    disponible: true,
                    timestamp: Date.now(),
                    user: 'mayor tom', //cambiar para que tome de un cookie
                    ubicacion: {
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude
                    },
                    distancia: $('#dispDisponible').val()
                }),
                dataType: 'json',
                contentType: 'json',
                headers: {
                    authorization: true; //despues poner otra cosa/codigo
                },
                success: function() {
                    // Confirmar/Error y redirigir al perfil del usuario
                    console.log('hizo el post');
                    // window.location.replace("/");
                }
            });
            // socket.emit('getClosestStops', {
            x
            // Comenté los dos de abajo porque los copié más arriba en .ajax
            // latitude: position.coords.latitude,
            // longitude: position.coords.longitude
            // });
        }, function(err) {
            console.log('Ocurrio un error mientras se intentaba obtener la ubicacion:' + err);
        }, {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 600000
        });

        // if you want to mock up your location, this is Powell & Market St
        // socket.emit('getClosestStops', {
        //     latitude: 37.7847999,
        //     longitude: -122.40768
        // });
    });
    // Cada X cantidad de segundos, hacer un GET a /data
    // Por cada elemento de la lista que responda el servidor,
    // agregarlo haciendo $('#contenedor .centre').append(htmlDelTweet)
    // HINT: usar la function getHTMLforTweet, que recibe un objeto que representa
    // un tweet y devuelve un objeto que representa su HTML

    // setInterval(function() {
    //     $.ajax({
    //         type: 'GET',
    //         url: '/data',
    //         dataType: 'json',
    //         headers: {
    //             'timestamp': lastTime,
    //             'user': $('#userName').text()
    //         },
    //         success: function(data) {
    //             data.forEach(function(curEl) {
    //                 var tweetHtml = getHTMLforTweet(curEl);

    //                 $('#contenedor .centre').append(tweetHtml);
    //             })
    //             lastTime = Date.now();
    //             console.log('imprimo el tweet.', data);
    //         }
    //     });
    // }, 3000);

    // function getHTMLforTweet(tweet) {
    //     var elemHTML = $('<div></div>');
    //     elemHTML.html('User:' + tweet.user.name +
    //         '<br>' + tweet.text);
    //     return elemHTML;
    // }
});