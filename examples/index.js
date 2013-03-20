var Benci = require('../src/benci');

var fsm = new Benci({
  iterations: 10000,
  actions: {
    start: function(name) {
      console.log('Starting test #' + name);
    },
    result: function(name, config) {
      console.log(name, config.total / config.iterated);
    },
    end: function(name) {
      console.log('Finished!');
    },
    error: function(name, config) {
      console.log('Error: ', config.error);
    }
  }
});

fsm.createSuite('my first suite', function(suite) {
  suite.make('test2', function(next) {
    for( i = 0; i < 1000; i++ ) {
      var a = Math.sqrt( Math.pow( Math.sin( Math.sqrt( Math.pow( i, 2 ))), 2 ));
    }
    next();
  });

  suite.make('test', function(next) {
    for( i = 0; i < 10000; i++ ) {
      var a = Math.sqrt( Math.pow( Math.sin( Math.sqrt( Math.pow( i, 2 ))), 2 ));
    }    
    next();
  });
});

fsm.run();