var Suite = function(config) {
  Object.keys(config).forEach(function(key) {
    this[key] = config[key];
  }, this);

  var that = this;
  this.suites = [];
  
  this.next = function() {
    that.results.total += that._getDateDiff(that._start);
  }
}

Suite.prototype.loop = function(name, callback) {
  var self = this;
  
  if( ++this.results.iterated >= this.iterations ) {
    this._end = +new Date();
    this.results.averaged = this.results.total / this.results.iterated;

    this._do('result');
    this._do('end');
    return;
  }

  self._start = new Date().getTime();
  try {
    callback.call(self, self.next);
  } catch(err) {
    this.results.error = err;
    this._do('error')
  }
  self.loop(name, callback);
}

Suite.prototype.make = function(name, callback) {
  this.suites.push({
    name: name,
    cb: callback
  });
}

Suite.prototype.run = function() {
  var self = this;

  Object(this.suites).forEach(function(suite) {
    self.results = {
      iterated: 0,
      total: 0,
      averaged: 0
    };

    self.name = suite.name;
    self.callback = suite.cb;

    self._do('start');
    self.loop(suite.name, suite.cb);
  }, this);
}

Suite.prototype._do = function(type) {
  this.actions[type].call(this, this.name, this.results);
}

Suite.prototype._getDateDiff = function(start) {
  return( new Date().getTime() - start );
}

module.exports = Suite;