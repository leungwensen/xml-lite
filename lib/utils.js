'use strict';
/**
 * utils module
 * @module utils
 * @see module:index
 */
const lang = require('zero-lang');

function noop() {
}

const utils = {
  domParser: null, // FIXME: to be initialised
  xmlSerializer: null, // FIXME: to be initialised
  parseFromString: (str) => utils.domParser.parseFromString(str, 'text/xml'),
  serializeToString: (doc) => utils.xmlSerializer.serializeToString(doc),

  findChildNode: (doc, tagName, attrs) => {
    attrs = attrs || {};
    if (!doc) return null;
    return utils.findChildNodes(doc, tagName, attrs)[0];
  },
  findChildNodes: (doc, tagName, attrs) => {
    attrs = attrs || {};
    if (!doc) return [];
    const resultNodes = lang.filter(doc.childNodes, (node) => (node.tagName === tagName));
    return lang.filter(resultNodes, (node) => (
      node && lang.every(lang.keys(attrs), (key) => (node.getAttribute(key) === attrs[key]))
    ));
  },
  findOrCreateChildNode: (doc, tagName, attrs) => {
    attrs = attrs || {};
    // throw 'doc not defined';
    if (!doc) return null;
    let resultNode = utils.findChildNode(doc, tagName, attrs);
    if (!resultNode) {
      let ownerDoc = doc;
      // create with ownerDocument
      if (!doc.createElement) ownerDoc = doc.ownerDocument;
      resultNode = ownerDoc.createElement(tagName);
      lang.forIn(attrs, (value, key) => {
        resultNode.setAttribute(key, value);
      });
      doc.appendChild(resultNode);
    }
    return resultNode;
  },

  eachChildNode: (doc, tagName, attrs, callback) => {
    callback = callback || noop;
    lang.each(utils.findChildNodes(doc, tagName, attrs), (node) => {
      callback(node);
    });
  },

  removeChildNode: (doc, tagName, attrs) => {
    attrs = attrs || {};
    const resultNode = utils.findChildNode(doc, tagName, attrs);
    if (resultNode) doc.removeChild(resultNode);
    return resultNode;
  },
};

module.exports = utils;
