var Suite = require('./suite');
var util  = require('util');

var Benci = function(config) {
  this.config = config;
  this.suites = [];
}

Benci.prototype.createSuite = function(name, cb) {
  var suite = new Suite(this.config);
  
  this.suites.push({
    name: name,
    cb: cb,
    obj: suite
  });

  util.inherits(Suite, Benci);
}

Benci.prototype.run = function() {
  Object(this.suites).forEach(function(suite) {
    suite.cb.call(this, suite.obj);
    suite.obj.run();
  }, this);
}

module.exports = Benci;