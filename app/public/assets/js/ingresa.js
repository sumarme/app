$(document).ready(function() {
    function checkLoginState() {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response)
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
                window.location.replace('/perfil');
                // console.log(response.authResponse.accessToken);
                // aca poner una funcion, definida despues, que llame a 
                // FB.api y haga console.log de los que tiene el access.Token
            } else if (response.status == 'not_authorized') {
                //esta logeado en FB pero no en la app
                document.getElementById('status').innerHTML = 'Por favor inicia sesion en SUMARME.';
            } else {
                //no esta logeado en FB
                document.getElementById('status').innerHTML = 'Por favor inicia sesion en Facebook.';
            }
        }, {
            scope: 'public_profile,email, user_birthday'
        });
    });
});