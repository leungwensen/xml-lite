'use strict';
/**
 * dom module
 * @module dom
 * @see module:index
 */
const lang = require('zero-lang');

function noop() {
}

const domUtils = {
  attributesAsObject: (doc) => {
    const result = {};
    const attributes = doc.attributes || [];
    lang.each(attributes, (attr) => {
      result[attr.name] = attr.value;
    });
    return result;
  },

  findChildNode: (doc, query) => {
    query = query || {};
    if (!doc) {
      return null;
    }
    return domUtils.findChildNodes(doc, query)[0];
  },

  findChildNodes: (doc, query) => {
    const FILTER_QUERY_PROPS = [
      'localName',
      'namespaceURI',
      'nodeName',
      'nodeType',
      'tagName',
    ];
    if (!doc) {
      return [];
    }
    let resultNodes = doc.childNodes || [];
    lang.each(FILTER_QUERY_PROPS, (prop) => {
      if (query[prop]) {
        resultNodes = lang.filter(doc.childNodes || [], (node) => (node[prop] === query[prop]));
      }
    });
    const attrs = query.attributes || {};
    return lang.filter(resultNodes, (node) => (
      node && lang.every(lang.keys(attrs), (key) => (node.getAttribute(key) === attrs[key]))
    ));
  },

  findAllNodes: (doc, query) => {
    let nodes = [];

    function findAllChildNodes(parentDoc) {
      nodes = nodes.concat(domUtils.findChildNodes(parentDoc, query));
      lang.each(parentDoc.childNodes || [], (node) => {
        findAllChildNodes(node);
      });
    }

    findAllChildNodes(doc);
    return nodes;
  },

  findNode: (doc, query) => domUtils.findAllNodes(doc, query)[0],

  createChildNode: (doc, query) => {
    // FIXME: support more NodeTypes
    if (!doc) {
      return null;
    }
    let ownerDoc = doc;
    const tagName = query.tagName || 'child';
    const attrs = query.attributes || {};
    // create with ownerDocument
    if (!doc.createElement) {
      ownerDoc = doc.ownerDocument;
    }
    const resultNode = ownerDoc.createElement(tagName);
    lang.forIn(attrs, (value, key) => {
      resultNode.setAttribute(key, value);
    });
    // TODO FIXME
    // if (doc.nodeType === 9 /* doc.DOCUMENT_NODE */ && doc.childNodes.length > 1) {
    // }
    doc.appendChild(resultNode);
    return resultNode;
  },

  findOrCreateChildNode: (doc, query) => {
    if (!doc) {
      return null;
    }
    let resultNode = domUtils.findChildNode(doc, query);
    if (!resultNode) {
      resultNode = domUtils.createChildNode(doc, query);
    }
    return resultNode;
  },

  eachChildNode: (doc, query, callback) => {
    callback = callback || noop;
    lang.each(domUtils.findChildNodes(doc, query), (node) => {
      callback(node);
    });
  },

  eachNode: (doc, query, callback) => {
    callback = callback || noop;
    lang.each(domUtils.findAllNodes(doc, query), (node) => {
      callback(node);
    });
  },

  removeChildNode: (doc, query) => {
    const resultNode = domUtils.findChildNode(doc, query);
    if (resultNode) {
      doc.removeChild(resultNode);
    }
    return resultNode;
  },
};

// NodeTypes
const NODE_TYPES = {
  ELEMENT_NODE: 1,
  ATTRIBUTE_NODE: 2,
  TEXT_NODE: 3,
  CDATA_SECTION_NODE: 4,
  ENTITY_REFERENCE_NODE: 5,
  ENTITY_NODE: 6,
  PROCESSING_INSTRUCTION_NODE: 7,
  COMMENT_NODE: 8,
  DOCUMENT_NODE: 9,
  DOCUMENT_TYPE_NODE: 10,
  DOCUMENT_FRAGMENT_NODE: 11,
  NOTATION_NODE: 12,
};

lang.extend(domUtils, {
  findNodes: domUtils.findAllNodes,
  NODE_TYPES,
}, NODE_TYPES);

module.exports = domUtils;
