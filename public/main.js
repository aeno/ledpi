var statusCallback = function(data) {
    $('#current').text(data.current_preset);
};

$(window).ready(function() {
    $('.run').on('click', function() {
        $.getJSON(
            "/run/"+$(this).data('preset'),
            statusCallback
        );
    });

    $.getJSON(
        "/status",
        statusCallback
    );
});
