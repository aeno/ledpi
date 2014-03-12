exports = module.exports = function(channels, bits) {
    var obj = {
        _chromath: require('chromath'),
        _driver:   null,
        _current:  {
            preset: 'off',
            timer: null,
            state: {
                h: 0,
                s: 0,
                l: 0,
                rgb: ''
            }
        },

        _init: function(channels, bits) {
            this._driver = new require('leddriver')(channels, bits);
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
                this._current.preset = new require('./programs/'+preset+'.js')(this._current, this._driver);
            } catch(err) {
                if (err.code == 'MODULE_NOT_FOUND') {
                    console.log('[ledpi] unknown preset "%s"', preset);
                    this.reset();
                    return;
                }
            }

            // run preset
            this._current.preset.run();
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

            this._current.timer = null;
            this._current.preset = 'off';

            if (process.env.NODE_ENV != 'nospi') {
                this._driver.setRGB("#000000", 0, 1, 2);
                this._driver.send();
            }
        }
    }

    obj._init(channels, bits);
    return obj;
};
