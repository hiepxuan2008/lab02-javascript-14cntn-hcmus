$(document).ready(function(){
    // Declare vars
    var positions = [];
    var itemLength = $('li.thumbnail').length;

    // Auto nextSlide
    var nextPos = 0; //index from zero
    var duration = 2;
    var autoScrollInterval = null;
    resetAutoScroll();
    initThumbSlider();
    nextSlide();

    function nextSlide() {
        // Scroll Slide
        $('#slides').stop().animate({marginLeft: -positions[nextPos] + 'px'}, 450);

        // Active selected thumbnail
        var thumbnails = $('li.thumbnail');
        thumbnails.removeClass('active');
        if (nextPos < thumbnails.length)
            $(thumbnails).eq(nextPos).addClass('active');

        // Increase next Position
        nextPos = ++nextPos % itemLength;
    }

    function resetAutoScroll() {
        if (autoScrollInterval !== null)
            clearInterval(autoScrollInterval);
        autoScrollInterval = setInterval(function() {nextSlide()}, duration * 1000);
    }

    function initThumbSlider()
    {
        // Set position and size of Slides
        var totalWidth = 0;
        $('#slides .slide').each(function(i){
            positions[i] = totalWidth;
            totalWidth += $(this).width();

            // Check widths
            if (!$(this).width()) {
                alert('Please add width');
                return false;
            }
        });
        $('#slides').width(totalWidth);

        // Menu item click handler
        $('#menu ul li a').click(function(e) {
            nextPos = $(this).parent().prevAll('.thumbnail').length;
            nextSlide();
            resetAutoScroll();

            e.preventDefault();
        });

    }
});