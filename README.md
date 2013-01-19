Resolveit
=========

> A highly configurable file resolver

## Summary ##

## Installation ##

~~~
npm install resolveit
~~~

## Usage ##

~~~
var resolveit = require('resolveit'),
    path;

try {
    path = resolveit.sync('foo', __dirname, {
        prefix: 'node_modules',
        index: ['index', 'main'],
        extension: ['js', 'node']
    });
}
catch (error) {
    console.log(error);
}

console.log('Found \'foo\' in \'' + path + '\'');
~~~


### Development Dependencies ###

Installed when you run `npm link` in the package directory.

~~~
mocha:  0.3.x
should: 0.5.x
sake:   0.1.x
ejs:    0.8.x
~~~


Report an Issue
---------------

* [Bugs](http://github.com/jhamlet/node-resolveit/issues)
* Contact the author: <jhamlet@hamletink.com>


License
-------

> Copyright (c) 2013 Jerry Hamlet <jerry@hamletink.com>
> 
> Permission is hereby granted, free of charge, to any person
> obtaining a copy of this software and associated documentation
> files (the "Software"), to deal in the Software without
> restriction, including without limitation the rights to use,
> copy, modify, merge, publish, distribute, sublicense, and/or sell
> copies of the Software, and to permit persons to whom the
> Software is furnished to do so, subject to the following
> conditions:
> 
> The above copyright notice and this permission notice shall be
> included in all copies or substantial portions of the Software.
> 
> The Software shall be used for Good, not Evil.
> 
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
> EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
> OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
> NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
> HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
> WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
> FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
> OTHER DEALINGS IN THE SOFTWARE.