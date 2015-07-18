$(document).ready(function($) {

    var $sviTeam = $('#svi-team'),
        $sviCities = $('#svi-cities'),
        landscapePhone = '(max-device-width: 800px) and (orientation: landscape)',
        isLandPhone = Modernizr.mq(landscapePhone);

    $(window).bind('resize', function() {
        isLandPhone = Modernizr.mq(landscapePhone);
    });

    $sviTeam.scrollToFixed({
        marginTop: function() {
            var marginTop = $sviCities.height() - $sviTeam.height();

            if (isLandPhone) {
                marginTop = -$sviTeam.outerHeight(true);
            }

            return marginTop >= 0 ? 0 : marginTop;
        }
    });

    /* Uncomment to get "Go to top arrow"
    $(".scroll-top").hide().css("bottom", "-100px");

    // Show go top / Hide scroll
    $(function () {

        $(window).scroll(function () {
            if ($(this).scrollTop() > 250) {
                $('.scroll-top').fadeIn().css("bottom", "0");
            } else {
                $('.scroll-top').fadeOut().css("bottom", "-100px");
            }
        });

        // Click go top
        $('a.go-top').click(function () {
            $('body,html').animate({
                scrollTop: 0
            }, 800);
            return false;
        });
    });
    */
});
