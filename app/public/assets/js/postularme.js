$(document).ready(function() {
    var ubicacion;
    var disponibleDesde = document.getElementById("timeDesde");
    var disponibleHasta = document.getElementById("timeHasta");
    var distancia = document.getElementById("distancia");

    $('#postularme').on("submit", function(event) {
        // Evitar el refresh por default
        event.preventDefault();
        // Obtener ubicacion
        waitingDialog.show();
        navigator.geolocation.getCurrentPosition(function(position) {
            
            var data = {
                //necesito agregar algun filtro para identificar el usuario
                disponible: true,
                disponibleDesde: disponibleDesde.options[disponibleDesde.selectedIndex].value,
                disponibleHasta: disponibleHasta.options[disponibleHasta.selectedIndex].value,
                timestamp: Date.now(),
                ubicacion: {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                distancia: distancia.options[distancia.selectedIndex].value
            };

            // hacer POST a /postularme
            $.ajax({
                type: 'POST',
                url: '/api/postularme',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json',
                headers: {
                    authorization: true //despues poner otra cosa/codigo
                },
                success: function(res) {
                    console.log(res);
                    window.location.replace("/perfil"); 
                },
                error: function(err) {
                    console.log('El error fue: ' + err);
                }
            });
        });
    });

    //le robé el waitingDialog a a0viedo
    var waitingDialog = (function($) {
        // Creating modal dialog's DOM
        var $dialog = $(
            '<div class="modal fade" data-backdrop="static" data-keyboard="false" tabindex="-1" role="dialog" aria-hidden="true" style="padding-top:15%; overflow-y:visible;">' +
            '<div class="modal-dialog modal-m">' +
            '<div class="modal-content">' +
            '<div class="modal-header"><h3 style="margin:0;"></h3></div>' +
            '<div class="modal-body">' +
            '<div class="progress progress-striped active" style="margin-bottom:0;"><div class="progress-bar" style="width: 100%"></div></div>' +
            '</div>' +
            '</div></div></div>');

        return {
            /**
             * Opens our dialog
             * @param message Custom message
             * @param options Custom options:
             *                options.dialogSize - bootstrap postfix for dialog size, e.g. "sm", "m";
             *                options.progressType - bootstrap postfix for progress bar type, e.g. "success", "warning".
             */
            show: function(message, options) {
                // Assigning defaults
                var settings = $.extend({
                    dialogSize: 'm',
                    progressType: ''
                }, options);
                if (typeof message === 'undefined') {
                    message = 'Loading';
                }
                if (typeof options === 'undefined') {
                    options = {};
                }
                // Configuring dialog
                $dialog.find('.modal-dialog').attr('class', 'modal-dialog').addClass('modal-' + settings.dialogSize);
                $dialog.find('.progress-bar').attr('class', 'progress-bar');
                if (settings.progressType) {
                    $dialog.find('.progress-bar').addClass('progress-bar-' + settings.progressType);
                }
                $dialog.find('h3').text(message);
                // Opening dialog
                $dialog.modal();
            },
            /**
             * Closes dialog
             */
            hide: function() {
                $dialog.modal('hide');
            }
        };

    })(jQuery);
});