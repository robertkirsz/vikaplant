$(function () {
  new WOW().init()

  //Przewijanie strony po kliknięciu na link
  $('#vika-nawigacja .navbar-nav').on('click', 'a', function (e) {
    e.preventDefault()

    $('html, body').animate(
      {
        scrollTop: $($(this).attr('href')).offset().top - 50
      },
      500
    )

    $(this).parent().siblings().removeClass('active')
    $(this).parent().addClass('active')

    //Jeśli strona jest w wersji mobilnej, zamknij pasek z linkami po kliknięciu na któryś z nich
    if ($(this).parent().parent().parent().hasClass('in')) {
      $('.navbar-toggle').click()
    }
  })

  $('#vika-logo').on('click', function (e) {
    e.preventDefault()
    $('html, body').animate({ scrollTop: 0 }, 500)
  })

  var mainSlider = {
    $slides: $('#slider .item'),
    slidesNumber: $('#slider .item').length,
    start: function () {
      setInterval(function () {
        var $aktywny = mainSlider.$slides.filter('.active')
        if ($aktywny.next().length == 0) {
          mainSlider.$slides.first().addClass('active')
        } else {
          $aktywny.next().addClass('active')
        }
        $aktywny.removeClass('active')
      }, 5000)
    }
  }
  mainSlider.start()

  //Wysyłanie wiadomości
  $('form[name=wiadomosc]').on('submit', function (e) {
    e.preventDefault()

    var $this = $(this)
    var $submit = $(this).find('button[type=submit]')

    $.ajax({
      type: 'POST',
      url: 'skrypty/wiadomosc.php',
      data: $this.serialize(),
      success: function (daneZwrotne) {
        var json = $.parseJSON(daneZwrotne)
        //Wyczyść formularz

        $this.find('textarea').val('')

        $submit
          .removeClass('btn-default')
          .addClass('btn-success')
          .html(json.ikona)

        //Zmień tekst przycisku
        setTimeout(function () {
          $submit
            .removeClass('btn-success')
            .addClass('btn-default')
            .html('Wyślij')
        }, 8000)
      }
    })
  })

  //Galeria Fancybox
  $('.fancybox').fancybox({
    scrollOutside: false,
    prevEffect: 'none',
    nextEffect: 'none'
  })
})
