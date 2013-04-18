# benci.js

## Installation

You can install this version via git:
```bash
npm install http://github.com/jiin/benci.git
```

And use in your source:
```javascript
var Benci = require('benci');
```
## Usage

```javascript
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
  suite.make('test', function(next) {
    for( i = 0; i < 1000; i++ ) {
      var a = Math.sqrt( Math.pow( Math.sin( Math.sqrt( Math.pow( i, 2 ))), 2 ));
    }      
    next();
  });

  suite.make('test2', function(next) {
    for( i = 0; i < 1000; i++ ) {
      var a = Math.sqrt( Math.pow( Math.sin( Math.sqrt( Math.pow( i, 2 ))), 2 ));
    }
    next();
  });
});

fsm.run();
```

## License

Rainbow is released under the [GNU General Public License (GPL3)](https://www.gnu.org/licenses/gpl-3.0.html):
Copyright (C) 2013 jiin

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or (at
your option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
General Public License for more details.

On Debian systems, the complete text of the GNU General Public License
can be found in /usr/share/common-licenses/GPL-3.

You should have received a copy of the GNU General Public License
along with this program. If not, see <http://www.gnu.org/licenses/>.
