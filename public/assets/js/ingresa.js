$(document).ready(function() {
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);

        })
    }

    FB.init({
        appId: '501734716657911',
        cookie: true,
        xfbml: true,
        version: 'v2.4'
    })

    $('#fbLogin').click(function() {
        FB.login(function(response) {
            if (response.status == 'connected') {
                testAPI();
            } else if (response.status == 'not_authorized') {
                //esta logeado en FB pero no en la app
                document.getElementById('status').innerHTML = 'Por favor inicia sesion en SUMARME.';
            } else {
                //no esta logeado en FB
                document.getElementById('status').innerHTML = 'Por favor inicia sesion en Facebook.';
            }
        }, {
            scope: 'public_profile,email',
            return_scopes: true
        });
    })

    function testAPI() {

        FB.api('/me?fields=id,name,email', function(response) {
            postFbApi(response);
        });
        // poner algo para validar que permisos pedi la primera vez y ver como hacer para que me de el mail tambien
    };

    function postFbApi(user) {
        // guardar info en MongoDB
        var data = {
            fb_id: JSON.stringify(user.id),
            user_name: JSON.stringify(user.name),
            user_email: JSON.stringify(user.email)
        };
        console.log(user.id);

        // hacer POST a /postularme
        $.ajax({
            type: 'POST',
            url: '/api/ingresar',
            data: JSON.stringify(data),
            dataType: 'json',
            contentType: 'application/json',
            headers: {
                authorization: true //despues poner otra cosa/codigo
            },
            success: function(res) {
                console.log(res);
                window.location.replace("/perfil"); // lo puse para que redirija hacia la homepage pero habría que pensar a donde queremos mandar al usuario
            },
            error: function(err) {
                console.log('El error fue: ' + err);
            }
        });
    }
});