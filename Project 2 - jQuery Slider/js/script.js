$(document).ready(function() {
    // Set options
    var fadeSpeed = 500;            // fade speed
    var autoSwitch = true;      // auto slider options
    var autoSwitchSpeed = 3000; // auto slider speed
    var autoNextSlideInterval = null;

    // Active first class
    $('.slide').first().addClass('active');

    // Hide all slide
    $('.slide').hide();

    // Show first active slide
    $('.active').show();

    $('#next').on('click', nextSlide);
    $('#prev').on('click', prevSlide);

    resetAutoNextSlide();

    function nextSlide() {
        if ($('.active').is(':last-child')) {
            $('.active').removeClass('active');
            $('.slide').first().addClass('active');
        } else {
            var next = $('.active').next();
            $('.active').removeClass('active');
            next.addClass('active');
        }
        // Fade
        $('.slide').fadeOut(fadeSpeed);
        $('.active').fadeIn(fadeSpeed);
        resetAutoNextSlide();
    }

    function prevSlide() {
        if ($('.active').is(':first-child')) {
            $('.active').removeClass('active');
            $('.slide').last().addClass('active');
        } else {
            var prev = $('.active').prev();
            $('.active').removeClass('active');
            prev.addClass('active');
        }
        // Fade
        $('.slide').fadeOut(fadeSpeed);
        $('.active').fadeIn(fadeSpeed);
        resetAutoNextSlide();
    }

    function resetAutoNextSlide() {
        if (autoNextSlideInterval !== null)
            clearInterval(autoNextSlideInterval);
        autoNextSlideInterval = setInterval(nextSlide, autoSwitchSpeed);
    }
});