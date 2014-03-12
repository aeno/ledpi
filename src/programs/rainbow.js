/**
 * Cycle through the color space
 * @type Object
 */
exports = module.exports = function(state, driver) {
    var obj = {
        _state: null,
        _driver: null,

        getName: function() {
            return 'rainbow';
        },

        _init: function(state, driver) {
            console.log('[ledpi rainbow] init');
            this._state = state;
            this._driver = driver;
        },

        run: function() {
            console.log('[ledpi rainbow] running preset');

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
                    self._driver.send();
                }
            }, 1);
        }
    };

    obj._init(state, driver);
    return obj;
};
