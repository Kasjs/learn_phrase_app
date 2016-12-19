require('babel-register')();
var chai = require("chai");
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.sinon = sinon;
global.expect = chai.expect;

global.document = jsdom('');
global.window = document.defaultView;
if (!global.window.localStorage) {
    global.window.localStorage = {
        getItem() { return '{}'; },
        setItem() {}
    };
}
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    exposedProperties.push(property);
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};

var documentRef = document;
