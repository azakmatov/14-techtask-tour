$(window).on('load', function () {

    (function initPlayVideo() {
        var $videoCover = $(".f-video-cover");
        var $videoPlayer = $(".f-video-player");
        var $videoUrl = $videoPlayer.data("video");
        $videoCover.on("click", function () {
            $videoPlayer.html(
                '<iframe src="https://www.youtube.com/embed/' + $videoUrl +
                '?feature=oembed&autoplay=1" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
            );
            $videoCover.fadeOut();
            $videoPlayer.css('display', 'block');
        });
    })();

    $('.timing__cards').slick({
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('#timingLeft'),
        nextArrow: $('#timingRight'),
        dots: true,
        dotsClass: $('#timing__dots'),
        variableWidth: true,
        // adaptiveHeight: true,
        // centerMode: true,
        // centerPadding: '10%',
        // responsive: [
        //     {
        //         breakpoint: 1200, // - от какой ширины изменять настройки(1100 и ниже)
        //         settings: {
        //             // вносим изменения на ширине 1100 и ниже
        //             slidesToShow: 2,
        //             slidesToScroll: 1
        //         }
        //     },
        // {
        //     breakpoint: 480, // брекпоинтов может быть сколько угодно
        //     settings: {
        //         slidesToShow: 1,
        //         slidesToScroll: 1
        //     }
        // }
        // ],
    });

    $('.photo__slick').slick({
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('#photoLeft1'),
        nextArrow: $('#photoRight1'),
        dots: true,
        dotsClass: $('#photo__dots1'),
        // adaptiveHeight: true,
    });

    $('.photo__slick2').slick({
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('#photoLeft2'),
        nextArrow: $('#photoRight2'),
        dots: true,
        dotsClass: $('#photo__dots2'),
        adaptiveHeight: true,
    });

    $('.feedback__cards').slick({
        accessibility: true,
        draggable: true,
        infinite: true,
        slidesToShow: 2,
        slidesToScroll: 1,
        swipeToSlide: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: $('#feedbackLeft'),
        nextArrow: $('#feedbackRight'),
        dots: true,
        dotsClass: $('#feedback__dots'),
        // variableWidth: true,
        responsive: [
            {
                breakpoint: 844, // - от какой ширины изменять настройки(992 и ниже)
                settings: {
                    // вносим изменения на ширине 992 и ниже
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            // {
            //     breakpoint: 480, // брекпоинтов может быть сколько угодно
            //     settings: {
            //         slidesToShow: 1,
            //         slidesToScroll: 1
            //     }
            // }
        ],
    });

    $('.open-popup-link').magnificPopup({
        type: 'inline',
        // midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });

    $('.photo__image').magnificPopup({
        type: 'image',
        midClick: true // Allow opening popup on middle mouse click. Always set it to true if you don't provide alternative source in href.
    });

    let thanks = $('#thanks');
    let arg = $('#argument');
    let great = $('#great');
    let name = '';
    let phone = '';
    let error = '';
    let hasError = false;
    const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    let loader = $('.loader');

    function validateEmail(value) {
        return EMAIL_REGEXP.test(value);
    }

    function calling(btn) {
        if (btn === 'popup-call') {
            name = $('#popup__call-name');
            phone = $('#popup__call-phone');
            error = $('.popup__call-error');
        } else if (btn === 'main-call') {
            name = $('#main__call-name');
            phone = $('#main__call-phone');
            error = $('.main__call-error');
        } else {
            alert('Такого не должно быть!');
            return false;
        }
        hasError = false;
        error.hide();
        name.css('border', 'inherit');
        phone.css('border', 'inherit');
        if (!name.val()) {
            name.css('border', '2px solid red');
            name.next().show();
            hasError = true;
        }
        if (!phone.val()) {
            phone.css('border', '2px solid red');
            phone.next().show();
            hasError = true;
        }

        if (!hasError) {
            loader.css('display', 'flex');
            $.ajax({
                method: 'POST',
                url: 'https://testologia.site/checkout',
                data: {name: name.val(), phone: phone.val()}
            })
                .done(function (msg) {
                    loader.hide();
                    if (msg.success) {
                        thanks.dialog({
                            // close:function() {
                            //     form.removeClass('hidden');
                            //     name.val('');
                            //     surname.val('');
                            //     tel.val('');
                            //     country.val('');
                            //     index.val('');
                            //     address.val('');
                            //     formTitle.removeClass('hidden');
                            //     dialogText.addClass('hidden');
                            // },
                        });
                        $('#call-popup .mfp-close').click();
                        // alert('Спасибо, мы свяжемся с вами в ближайшее время!');
                    } else {
                        arg.dialog({});
                        $('#call-popup .mfp-close').click();
                        // alert('Извините, но мы можем позвонить вам только если вы укажете имя как itlogia');
                    }
                })
            name.val('');
            phone.val('');
        }
    }

    $('#main-call').click(function () {
        calling('main-call');
    });

    $('#popup-call').click(function () {
        calling('popup-call');
    });

    $('#main__btn').click(function () {
        $('#program')[0].scrollIntoView({behavior: "smooth"});
    });

    $('#subscribe').click(function () {
        let email = $('.footer__email');
        let forEmail = $('.for-email');
        let emailError = $('.email-error');
        emailError.hide();
        forEmail.css('border', '0');
        if (!email.val()) {
            forEmail.css('border', '3px solid red');
            forEmail.next().show();
        } else {
            if (!validateEmail(email.val())) {
                alert('Пожалуйста, введите правильно поле E-Mail \nПример: login@example.com');
                return false;
            } else {
                great.dialog();
            }
        }
    });

    $('.form__tel').inputmask({"mask": "+999(999)99-99-99"});

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('#burger').click(() => {
        $('#menu').addClass('menu__open');
    });

    $('#menu *').each((index, element) => {
        $(element).click(() => {
            $('#menu').removeClass('menu__open');
        });
    });

    // document.getElementById('burger').onclick = function () {
    //     document.getElementById('menu').classList.add('menu__open');
    // }
    //
    // document.querySelectorAll('#menu *').forEach((item) => {
    //     item.onclick = () => {
    //         document.getElementById('menu').classList.remove('menu__open');
    //     }
    // });

});


