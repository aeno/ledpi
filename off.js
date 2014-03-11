var LEDDRIVER = require("leddriver");
var driver = new LEDDRIVER(24, 12);

driver.setRGB("#000000", 0, 1, 2);
driver.send();
