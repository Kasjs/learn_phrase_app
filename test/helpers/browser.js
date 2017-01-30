require('babel-register')();
var chai = require("chai");
var sinon = require('sinon');
var jsdom = require('jsdom').jsdom;
var exposedProperties = ['window', 'navigator', 'document'];

global.sinon = sinon;
global.expect = chai.expect;
global.document = jsdom('');
var window = document.defaultView;
global.window = window;
global.$ = require('jquery');
global.email = 'test@email.com';
global.setCat = [];
global.setCat.length = 0;

if (!global.window.localStorage) {
    global.window.localStorage = {
        getItem() { return '{}'; },
        setItem() {},
        clear() {}
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
