

    //Fixed Clock, Added parallax
    // Hide Header on on scroll down
    var didScroll;
    var lastScrollTop = 152;
    var delta = 5;
    var navbarHeight = $('#SVI_Site--global-nav').outerHeight();

    $(window).scroll(function(event){
        didScroll = true;
    });

    function hasScrolled() {
        var st = $(this).scrollTop();

        // Make sure they scroll more than delta
        if(Math.abs(lastScrollTop - st) <= delta)
            return;

        // If they scrolled down and are past the navbar, add class .nav-up.
        // This is necessary so you never see what is "behind" the navbar.
        if (st > lastScrollTop && st > navbarHeight){
            // Scroll Down
            $('#SVI_Site--global-nav').removeClass('global-nav__fixed').addClass('global-nav__fixed-closed');
        } else {
            // Scroll Up
            if(st + $(window).height() < $(document).height()) {
                $('#SVI_Site--global-nav').removeClass('global-nav__fixed-closed').addClass('global-nav__fixed');
            }
        }

        lastScrollTop = st;
    }

    var offset = 152;
    var duration = 500;
    $(window).scroll(function() {
        if ($(this).scrollTop() > offset) {
            if($('#SVI_Site--global-nav').hasClass('global-nav__fixed-closed')){

            }else{
                $('#SVI_Site--global-nav').removeClass('global-nav__static').addClass('global-nav__fixed');
            }
            $('body').removeClass('gn-static');
            $('.global-nav__inner .gn-nav__btn').removeClass('btn-grey').addClass('btn-blue');
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        } else {
            $('#SVI_Site--global-nav').removeClass('global-nav__fixed').addClass('global-nav__static');
            $('body').addClass('gn-static');
            $('.global-nav__inner .gn-nav__btn').removeClass('btn-blue').addClass('btn-grey');
        }
    });



$(document).ready(function(){
    $('.cf-input--text').blur(function(){
        if($(this).val().length != 0){
            $(this).parent().addClass('with-value');
        }else{
            $(this).parent().removeClass('with-value');
        }
    });

    autosize($('textarea'));

    $('.global-nav_onepage .gn-nav__list .gn-nav__link, .gn-nav__btn--wrap .gn-nav__btn').click(function() {
        var target = $(this).attr('href');
            target = target.replace('/','');
        $('html,body').animate({scrollTop: $(target).offset().top+'px'}, 500);

        if ($(window).width() < 1040) {
            $('.global-nav__inner .gn-nav__list').removeClass('open');
            $('.global-nav__wrap').removeClass('open');
            $('body').removeClass('overflow');
            $('body').addClass('gn-static');
        }

        return false;
    });

    $('#gn-nav__link-open-menu').click(function(){
        $('.global-nav__inner .gn-nav__list').toggleClass('open');
        $('.global-nav__wrap').toggleClass('open');
        $('body').toggleClass('overflow');
        $('body').toggleClass('gn-static');
        $(this).find('.gn-nav__link--text').html($(this).find('.gn-nav__link--text').text() == 'Close' ? 'Menu' : 'Close');
        return false;
    });


    setPadding();

    calcTime('kyiv','+3');
    setInterval(function() {
        calcTime('kyiv','+3')
    }, 1000);

    calcTime('manila','+8');
    setInterval(function() {
        calcTime('manila','+8')
    }, 1000);

    calcTime('stanford','-7');
    setInterval(function() {
        calcTime('stanford','-7')
    }, 1000);

    $('.contact-form--form').submit(function(){ 
          var form = $(this); 
          var error = false; 
          form.find('.cf-input--text').each( function(){ 
            if ($(this).val() == '') { 
              $(this).parent().addClass('error');
              error = true; 
            }
          });
          if (!error) { 
            var data = form.serialize(); 
            $.ajax({ 
               type: 'POST', 
               url: form.attr('action'), 
               dataType: 'json', 
               data: data, 
                beforeSend: function(data) { 
                      form.find('input[type="submit"]').attr('disabled', 'disabled'); 
                    },
                success: function(data){ 
                    if (data['error']) { 
                      $('.error-message').addClass('show');
                      form.animate({'opacity':'0','visibility':'hidden','marginTop':'-25px'},400);
                      setTimeout(function(){
                        $('.error-message').removeClass('show');
                        form.animate({'opacity':'1','visibility':'visible','marginTop':'0px'},400);
                      }, 4000);
                    } else { // если все прошло ок
                      $('.thank-you-message').addClass('show');
                      form.animate({'opacity':'0','visibility':'hidden','marginTop':'-25px'},400);
                      form.find('.cf-input--text').each( function(){ 
                        $(this).val('');
                      });
                      setTimeout(function(){
                        $('.thank-you-message').removeClass('show');
                        form.animate({'opacity':'1','visibility':'visible','marginTop':'0px'},400);
                      }, 4000);
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) { 
                      
                },
                complete: function(data) { 
                      form.find('input[type="submit"]').prop('disabled', false);
                }
                            
            });
        }
        return false; 
    });

    $('.contact-form--form .cf-input--text').keyup(function(){
        $(this).parent().removeClass('error');
    });
});

    $('[data-type="background"]').each(function(){
        var $bgobj = $(this); // assigning the object
        
        $(window).scroll(function() {
            var yPos = -(($(window).scrollTop()) / $bgobj.data('speed'))+160; 
               
            // Put together our final background position
            var coords = '50% '+ yPos + 'px';

            // Move the background
            $bgobj.css({ backgroundPosition: coords });
        }); 
    });    


function calcTime(city, offset) {

    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    var nd = new Date(utc + (3600000 * offset));

    var tfh = nd.getHours();

    var DayOrNight = null;
    if(tfh > 8 && tfh < 20){
        DayOrNight = 'day-time';
    } else {
        DayOrNight = 'night-time';
    }

    $('.'+city+'-time')
        .addClass(DayOrNight)
        .html(formatAMPM(nd));
    $('.city-shape.city-'+city)
        .addClass('city-with-time');

}


function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Fix clock
    return '<span>' + hours + ':' + minutes + '</span>' + ampm;
}

function setPadding(){
    padding = (($(window).height()) - ($('#SVI_Home--header .header__inner').height())) / 2;

    if ((padding > 152) && (padding < 232)) {
        $('section, .role-section').css({
           'paddingTop' : padding+'px',
           'paddingBottom' : padding+'px'
        })
    }
}

$(window).resize(function(){
    setPadding();
});







