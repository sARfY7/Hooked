$(document).ready(function () {
    var owl = $('.owl-carousel');
    owl.owlCarousel({
        loop:false,
        nav:false,
        responsive:{
            0:{
                items:2
            },
            600:{
                items:4
            },
            1000:{
                items:6
            }
        }
    });
    $('#prev').click(function () {
        owl.trigger('prev.owl');
    });
    $('#next').click(function () {
        owl.trigger('next.owl');
    });
});