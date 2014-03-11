var ledpi = {
    _channels: 24,
    _bits:     12,
    _wired

    _chromath: require('chromath'),
    _driver: new require('leddriver')(this._channels, this._bits),

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

        return this._current.preset === 'off' ? 'off' : this._current.preset.getName();
    },

    run: function(preset) {
        this.reset();

        if (preset === 'off') {
            return;
        }

        try {
            this._current.preset = require('./programs/'+preset+'.js');
        } catch(err) {
            if (err.code == 'MODULE_NOT_FOUND') {
                console.log('[ledpi] unknown preset "%s"', preset);
                this.reset();
                return;
            }
        }

        // run preset
        this._current.preset.run(this._current, this._driver);
    },

    /**
     * Special program to turn all LEDs off.
     * @return void
     */
    reset: function() {
        console.log('[ledpi] resetting LED');

        this._current.state = {
            h: 0,
            s: 0,
            l: 0,
            rgb: ''
        };

        if (this._current.timer) {
            clearInterval(this._current.timer);
        }

        this.current.timer = null;
        this.current.preset = 'off';

        this._driver.setRGB("#000000", 0, 1, 2);
        this._driver.send();
    }
};

exports.getStatus = ledpi.getStatus;
exports.run       = ledpi.run;
