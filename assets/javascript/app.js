
$(document).ready(function () {
    console.log("ready!");

    var topics = [
        'Captain America',
        'Spider-Man',
        'Iron-Man',
        'Thanos',
        'Black Panther',
        'Groot',
        'Rocket Raccoon',
        'Captain Marvel',
        'Hulk',
        'Thor'
    ]

    renderButtons();
    function renderButtons() {
        $('.buttons').empty();
        for (var i = 0; i < topics.length; i++) {
            var button = $('<button>');
            button.addClass('gifs');
            button.attr('data-value', topics[i].replace(/\s+/g, '+'));
            button.attr('data-state', 'still');
            button.text(topics[i]);
            $('.buttons').append(button);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var gifInput = $("#giphy-input").val().trim();

        if (gifInput == '') {
            return false;
        }

        topics.push(gifInput);

        renderButtons();
        $('#giphy-form')[0].reset();
    });


    $(document).on('click', '.gifs', function () {

        var gifData = $(this).attr('data-value')
        // var state = $(this).attr('data-state');
        console.log(gifData);
        queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=hQF91TC0yyfVRfg6eKOdBe95T4NyI02X&q=' + gifData + '&limit=10&offset=0&rating=&lang=en';
        $.ajax({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
            var results = response.data

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $('<div>');
                gifDiv.addClass('gifDiv');
                var p = $("<p>").text('Rating: ' + results[i].rating.toUpperCase());
                var gifImage = $('<img>');
                var gifStill = results[i].images.fixed_height_still.url;
                var gifAnimate = results[i].images.fixed_height.url;
                gifImage.addClass('giphy');
                gifImage.attr('src', gifStill);
                gifImage.attr('data-still', gifStill);
                gifImage.attr('data-animate', gifAnimate);
                gifImage.attr('data-state', 'still');
                gifImage.attr('alt', gifData);

                gifDiv.append(gifImage);
                gifDiv.append(p);

                $('.gifs-here').prepend(gifDiv);
            }

        });

    });

    $(document).on('click', '.giphy', function () {
        var gifAnimate = $(this).attr('data-animate');
        var gifStill = $(this).attr('data-still');

        if ($(this).attr('data-state') === 'still') {
            $(this).attr('src', gifAnimate)
            $(this).attr('data-state', 'animate')
        }
        else {
            $(this).attr('src', gifStill)
            $(this).attr('data-state', 'still')
        }
    });

});

