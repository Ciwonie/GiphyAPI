
$(document).ready(function () {
    console.log("ready!");

    var topics = [
        'Captain America',
        'Spider-Man',
        'Iron-Man',
        'Thanos',
        'Black Panther',
        'Groot',
        'Drax',
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
            button.text(topics[i]);
            $('.buttons').append(button);
        }
    }

    $("#add-gif").on("click", function (event) {
        event.preventDefault();

        var gifInput = $("#giphy-input").val().trim();

        topics.push(gifInput);

        renderButtons();
    });


    $(document).on('click', '.gifs', function () {

        var gif = $(this).attr('data-value')
        console.log(gif);
        queryURL = 'https://api.giphy.com/v1/gifs/search?api_key=hQF91TC0yyfVRfg6eKOdBe95T4NyI02X&q=' + gif + '&limit=10&offset=0&rating=&lang=en';
        $.ajax ({
            url: queryURL,
            method: 'GET'
        }).then(function (response) {
                var gifURL = response.data.image_original.url;

                var gifImage = $('<img>');

                gifImage.attr('src', gifURL);
                gifImage.attr('alt', gif);

                $('.gifs').prepend(gifImage);
            });


    });


});

