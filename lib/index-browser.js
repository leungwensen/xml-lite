'use strict';
/**
 * index-browser module
 * @module index-browser
 * @see module:index
 */
const lang = require('zero-lang');
const NODE_TYPE = require('./node-type');
const xml = require('./xml');
const dom2js = require('./dom2js');
const dom2json = require('./dom2json');
const getInnerXML = require('./get-inner-xml');
const js2xml = require('./js2xml');
const json2xml = require('./json2xml');
const xml2js = require('./xml2js');
const xml2json = require('./xml2json');
const sanitize = require('./sanitize');

lang.extend(xml, {
  ENV: 'browser',
  NODE_TYPE,
  dom2js,
  dom2json,
  domParser: new DOMParser(),
  getInnerXML,
  getOuterXML: xml.serialize,
  js2xml,
  json2xml,
  sanitize,
  xml2js,
  xml2json,
  xmlSerializer: new XMLSerializer(),
});

module.exports = xml;
