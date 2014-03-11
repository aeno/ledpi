var ledpi = {
    _channels: 24,
    _bits:     12,

    _chromath: require('chromath'),
    _driver: new require('leddriver')(ledpi._channels, ledpi._bits),

    _current: {
        preset: 'off',
        timer: null,
        state: {
            h: 0,
            s: 0,
            l: 0,
            rgb: ''
        }
    },

    getStatus: function() {
        console.log('[ledpi] sending status');

        return ledpi._current.preset === 'off' ? 'off' : ledpi._current.preset.getName();
    },

    run: function(preset) {
        ledpi.reset();

        if (preset === 'off') {
            return;
        }

        try {
            ledpi._current.preset = require('./programs/'+preset+'.js');
        } catch(err) {
            if (err.code == 'MODULE_NOT_FOUND') {
                console.log('[ledpi] unknown preset "%s"', preset);
                ledpi.reset();
                return;
            }
        }

        // run preset
        ledpi._current.preset.run(ledpi._current, ledpi._driver);
    },

    /**
     * Special program to turn all LEDs off.
     * @return void
     */
    reset: function() {
        console.log('[ledpi] resetting LED');

        ledpi._current.state = {
            h: 0,
            s: 0,
            l: 0,
            rgb: ''
        };

        if (ledpi._current.timer) {
            clearInterval(ledpi._current.timer);
        }

        ledpi.current.timer = null;
        ledpi.current.preset = 'off';

        ledpi._driver.setRGB("#000000", 0, 1, 2);
        ledpi._driver.send();
    }
};

exports.getStatus = ledpi.getStatus;
exports.run       = ledpi.run;
