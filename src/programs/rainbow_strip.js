/**
 * Cycle through the color space with first 4 LEDs
 * @type Object
 */
exports = module.exports = function(state, driver) {
    var obj = {
        _state: null,
        _driver: null,

        getName: function() {
            return 'rainbow_strip';
        },

        _init: function(state, driver) {
            console.log('[ledpi rainbow_strip] init');
            this._state = state;
            this._driver = driver;
        },

        run: function() {
            console.log('[ledpi rainbow_strip] running preset');

            var Chromath = require('chromath');
            var self = this;

            this._state.timer = setInterval(function() {
                self._state.state.h += 0.0001;

                if (self._state.state.h > 1) {
                    self._state.state.h -= 1;
                }

                self._state.state.s = 1,
                self._state.state.l = 0.5;

                self._state.state.rgb =
                    new Chromath.hsl(
                        self._state.state.h * 360,
                        self._state.state.s,
                        self._state.state.l
                    )
                    .toHexString();

                if (process.env.NODE_ENV != 'nospi') {
                    self._driver.setRGB(self._state.state.rgb, 0, 1, 2);
                    self._driver.setRGB(self._state.state.rgb, 3, 4, 5);
                    self._driver.setRGB(self._state.state.rgb, 6, 7, 8);
                    self._driver.setRGB(self._state.state.rgb, 9, 10, 11);
                    self._driver.send();
                }
            }, 1);
        }
    };

    obj._init(state, driver);
    return obj;
};
