$(function() {

    new WOW().init();

    //Przewijanie strony po kliknięciu na link
    $('#vika-nawigacja .navbar-nav').on('click', 'a', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 50
        }, 500);
        $(this).parent().siblings().removeClass('active');
        $(this).parent().addClass('active');
        //Jeśli strona jest w wersji mobilnej, zamknij pasek z linkami po kliknięciu na któryś z nich
        if ($(this).parent().parent().parent().hasClass('in')) {
            $('.navbar-toggle').click();
        }
    });

    $('#vika-logo').on('click', function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 500);
    });

    var mainSlider = {
        $slides: $('#slider .item'),
        slidesNumber: $('#slider .item').length,
        start: function() {
            setInterval(function() {
                var $aktywny = mainSlider.$slides.filter('.active');
                if ($aktywny.next().length == 0) {
                    mainSlider.$slides.first().addClass('active');
                } else {
                    $aktywny.next().addClass('active');
                }
                $aktywny.removeClass('active');
            }, 5000);
        }
    };
    mainSlider.start();

    //Wysyłanie wiadomości
    $('form[name=wiadomosc]').on('submit', function(e) {
        e.preventDefault();
        var $this = $(this),
            $submit = $(this).find('button[type=submit]');
        $.ajax({
            type: 'POST',
            url: 'skrypty/wiadomosc.php',
            data: $this.serialize(),
            success: function(daneZwrotne) {
                var json = $.parseJSON(daneZwrotne);
                //Wyczyść formularz
                $this.find('textarea').val('');
                $submit.removeClass('btn-default').addClass('btn-success').html(json.ikona);
                //Zmień tekst przycisku
                setTimeout(function() {
                    $submit.removeClass('btn-success').addClass('btn-default').html('Wyślij');
                }, 8000);
            }
        });
    });

    //Galeria Fancybox
    $('.fancybox').fancybox({
        scrollOutside: false,
        prevEffect: 'none',
        nextEffect: 'none'
    });

    //Mapa
    var googleMap = {
        stylesArray: [{"featureType":"landscape","stylers":[{"saturation":-100},{"lightness":65},{"visibility":"on"}]},{"featureType":"poi","stylers":[{"saturation":-100},{"lightness":51},{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"road.arterial","stylers":[{"saturation":-100},{"lightness":30},{"visibility":"on"}]},{"featureType":"road.local","stylers":[{"saturation":-100},{"lightness":40},{"visibility":"on"}]},{"featureType":"transit","stylers":[{"saturation":-100},{"visibility":"simplified"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"labels","stylers":[{"visibility":"on"},{"lightness":-25},{"saturation":-100}]},{"featureType":"water","elementType":"geometry","stylers":[{"hue":"#ffff00"},{"lightness":-25},{"saturation":-97}]}],
        start: function() {
            google.maps.event.addDomListener(window, 'load', this.initialize());
        },
        initialize: function() {
            var mapCanvas = document.getElementById('map-canvas'),
                wspolrzedne = new google.maps.LatLng(52.3320181, 20.8732535);

            var mapOptions = {
                center: wspolrzedne,
                zoom: 15, //0 - 22
                scrollwheel: false, //Zoom kółkiem myszy
                mapTypeId: google.maps.MapTypeId.ROADMAP, //ROADMAP, SATELLITE, HYBRID, TERRAIN
                backgroundColor: '#CECECE',
                mapTypeControl: true, //Zmiana sposobu wyswietlania - mapa, satelita, teren
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL //Mały przycisk zoom
                },
                disableDefaultUI: false,
                styles: this.stylesArray
            };

            var map = new google.maps.Map(mapCanvas, mapOptions);

            // https://developers.google.com/maps/documentation/javascript/markers#add
            var marker = new google.maps.Marker({
                position: wspolrzedne,
                //icon: '/portfolio/ctrlhome/img/marker.png',
                map: map
            });

            $('#map-canvas').click(function() {
                map.set('scrollwheel', true);
            });
        }
    };
    googleMap.start();

});
