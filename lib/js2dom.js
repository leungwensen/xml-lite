const js2xml = require('./js2xml')
const xml = require('./xml')

module.exports = (obj) => xml.parse(js2xml(obj))
