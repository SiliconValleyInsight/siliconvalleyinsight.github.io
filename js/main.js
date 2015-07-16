$(document).ready(function($) {

    // ScrollReveal
    // window.sr = new scrollReveal();
    
    // Arrows / Go top link
    // Hide go top link
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
});
