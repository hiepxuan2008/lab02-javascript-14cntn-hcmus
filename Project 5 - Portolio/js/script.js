$(document).ready(function() {
   $('nav a').on('click', function() {
      var category = $(this).parent().data('tag');

      // Remove hidden class if 'all-projects' js selected
      if (category === 'all') {
          $('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
      } else {
          $('ul#gallery li').each(function() {
              if ($(this).data('tag').indexOf(category) < 0) {
                  $(this).hide().addClass('hidden');
              } else {
                  $(this).fadeIn('slow').removeClass('hidden');
              }
          })
      }

      // Stop link behavior
      return false;
   });

   // Add overlay
    $('ul#gallery li').each(function() {
        // Get data attribute values
        var title = $(this).children().data('title');
        var desc = $(this).children().data('desc');

        if (title === 'null') {
            title = '';
        }

        if (desc === null ) {
            dsec = "Click to Enlarge";
        }

        // Create overlay div
        $(this).append('<div class="overlay"></div>');

        // Get the overlay div
        var overlay = $(this).children('.overlay');

        // Add html to overlay
        overlay.html('<h3>'+title+'</h3><p>'+desc+'</p>');
    });

   $('ul#gallery li').on('mouseenter', function() {
       $(this).children('.overlay').stop().fadeIn(400);
   });

    $('ul#gallery li').on('mouseleave', function() {
        $(this).children('.overlay').stop().fadeOut(400);
    });




});