mocha.setup('bdd');

require('./dom2js.spec');
require('./dom-utils.spec');
require('./js2xml.spec');
require('./xml2js.spec');
require('./parse-error.spec');

mocha.run();
