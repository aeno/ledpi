var statusCallback = function(data) {
    $('#current').text(data.current_preset);
};

$(window).ready(function() {
    $('#rainbow').on('click', function() {
        $.getJSON(
            "/run/rainbow",
            statusCallback
        );
    });

    $('#off').on('click', function() {
        $.getJSON(
            "/run/off",
            statusCallback
        );
    });

    $.getJSON(
        "/status",
        statusCallback
    );
});
