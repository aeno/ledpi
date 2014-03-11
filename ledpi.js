var Chromath = require('chromath');
var LEDDRIVER = require("leddriver");
var driver = new LEDDRIVER(24, 12);    //24 channels, 12-bit

var current_preset = 'off';
var current_timer = null;
var current_state = {
    h: 0,
    s: 0,
    l: 0,
    rgb: ''
};

exports.getStatus = function() {
    console.log('[ledpi] sending status');

    return current_preset;
};

exports.run = function(preset) {
    reset_led();

    switch (preset) {
        case 'rainbow':
            rainbow();
        break;
        case 'off':
            reset_led();
            break;
    }
};

function reset_led() {
    console.log('[ledpi] resetting LED');

    current_state = {
        h: 0,
        s: 0,
        l: 0,
        rgb: ''
    };

    if (current_timer) {
        clearInterval(current_timer);
    }

    current_timer = null;
    current_preset = 'off';

    driver.setRGB("#000000", 0, 1, 2);
    driver.send();
}

function rainbow() {
    console.log('[ledpi] activating rainbow preset');

    current_preset = 'rainbow';
    current_timer = setInterval(function() {
        current_state.h += 0.001;

        if (current_state.h > 1) {
            current_state.h -= 1;
        }

        current_state.s = 1,
        current_state.l = 0.5;

        current_state.rgb =
            new Chromath.hsl(
                current_state.h * 360,
                current_state.s,
                current_state.l
            )
            .toHexString();

        driver.setRGB(current_state.rgb, 0, 1, 2);
        driver.send();
    }, 10);
}
