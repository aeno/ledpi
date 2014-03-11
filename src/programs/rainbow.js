/**
 * Cycle through the color space
 * @type Object
 */
var rainbow = {
    run: function(state, driver) {
        console.log('[ledpi rainbow] running preset');

        state.preset = 'rainbow';
        state.timer = setInterval(function() {
            state.state.h += 0.001;

            if (state.state.h > 1) {
                state.state.h -= 1;
            }

            state.state.s = 1,
            state.state.l = 0.5;

            state.state.rgb =
                new Chromath.hsl(
                    state.state.h * 360,
                    state.state.s,
                    state.state.l
                )
                .toHexString();

            driver.setRGB(state.state.rgb, 0, 1, 2);
            driver.send();
        }, 1);
    }
};

exports.run = rainbow.run;
exports.getName = function() { return 'rainbow'; };
