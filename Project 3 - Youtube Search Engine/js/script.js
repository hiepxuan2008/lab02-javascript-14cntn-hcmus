/**
 * Created by Mai Thanh Hiep on 4/9/2017.
 */

$(document).ready(function() {
    var searchField = $('#query');
    var searchBtn = $('#searchBtn');

    // Focus Event Handler
   $(searchField).on('focus', function() {
       $(this).animate({
          width: '100%'
       }, 400);

       $(searchBtn).animate({
           right: '10px'
       }, 400);
   });

   // Blur Event Handler
    $(searchField).on('blur', function() {
        $(this).animate({
            width: '50%'
        }, 400);

        $(searchBtn).animate({
            right: '320px'
        }, 400);
    });

    $('#search-form').submit(function(e) {
        e.preventDefault();
    });

    $("[data-fancybox]").fancybox({
        // Options will go here
    });
});


function search() {
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');
    // Get Form Input
    q = $('#query').val();
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.get(url, {
        part: 'snippet, id',
        q: q,
        type: 'video',
        key: 'AIzaSyB8Gnf08ML0oX_86IQhw5_K9PlZs4j68F4'
    }, function(data) {
        console.log(data);
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        $.each(data.items, function(i, item) {
            $('#results').append(getOutput(item));

        });

        $('#buttons').append(getButtons(prevPageToken, nextPageToken));
    });
    return true;
}

function getOutput(item) {
    var videoId = item.id.videoId;
    var channelTitle = item.snippet.channelTitle;
    var description = item.snippet.description;
    var title = item.snippet.title;
    var thumbnail = item.snippet.thumbnails.high.url;
    var publishedAt = item.snippet.publishedAt;

    var output = '<li><div class="item-left">'
        + '<a data-fancybox href="https://www.youtube.com/embed/'+videoId+'"><img src="'+thumbnail+'"></a>'
        + '</div><div class="item-right">'
        + '<h1>'+title+'</h1>'
        + '<small>Upload by <span class="channel">'+channelTitle+'</span> at '
        + '<span class="publishedAt">'+publishedAt+'</span></small>'
        + '<p>'+description+'</p></div><div class="clearfix"></div></li>';
    return output;
}

function getButtons(prevPageToken, nextPageToken) {
    var output = '';
    if (prevPageToken) {
        output += '<button onclick="gotoPage(\'' + prevPageToken+'\')">Prev</button>';
    }
    if (nextPageToken) {
        output += '<button onclick="gotoPage(\'' + nextPageToken+'\')">Next</button>';
    }
    return output;
}

function gotoPage(token) {
    // Clear Results
    $('#results').html('');
    $('#buttons').html('');
    q = $('#query').val();
    var url = 'https://www.googleapis.com/youtube/v3/search';
    $.get(url, {
        part: 'snippet, id',
        q: q,
        pageToken: token,
        type: 'video',
        key: 'AIzaSyB8Gnf08ML0oX_86IQhw5_K9PlZs4j68F4'
    }, function(data) {
        console.log(data);
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        $.each(data.items, function(i, item) {
            $('#results').append(getOutput(item));

        });

        $('#buttons').append(getButtons(prevPageToken, nextPageToken));
    });
    return true;
}