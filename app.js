/**
 *           Raspberry Pi    led driver
 * grau      GND             GND
 * rot       5V or 3.3V      input V+
 * schwarz   SCLK            input CLK
 * blau      MOSI            input DIN
 * braun     CE0             input LAT
 */

var express = require('express');
var app = express();
var ledpi = new require('./src/ledpi.js')(24, 12);

if (process.env.NODE_ENV == 'nospi') {
    console.log('RUNNING IN NO SPI MODE');
}

app.get('/', function(req, res) {
    res.sendfile('public/index.html');
});

app.get('/main.js', function(req, res) {
    res.sendfile('public/main.js');
});

app.get('/run/:preset', function(req, res) {
    switch (req.params.preset) {
        case 'rainbow':
        case 'off':
            ledpi.run(req.params.preset);
            break;
    }

    res.json(
        {current_preset: ledpi.getStatus()}
    );
});

app.get('/status', function(req, res) {
    res.json(
        {current_preset: ledpi.getStatus()}
    );
});

var server = app.listen(8080, function() {
    console.log('Listening on %d', server.address().port);
});
