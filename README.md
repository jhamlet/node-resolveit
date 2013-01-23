resolveIt
=========

> A highly configurable file resolver

Summary
-------

Given a `searchPath`, and various options, return a resolved path.

Works on the same principle as node's `require.resolve` method does, however, it is far more configurable and does not assume any particular structure. (i.e: you have to give it the structure to search).


Installation
------------

~~~
npm install resolveit
~~~

Usage
-----

~~~
var resolveIt = require('resolveit'),
    path;

try {
    path = resolveIt.sync('foo', __dirname, {
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


Public API
----------

### resolveIt.sync(search, [basedir], [options]) ###

Will return a string (or an array of strings if `options.findAll` is true). Will throw an `Error` if the `search` can not be found (unless `options.silent` is true).

Takes the following arguments:

* `search` a string, the name, or subpath, you want to find
* `basedir` a string, or an array of strings, of the directories you want to start searching from.
* `options` an object with one or more of the following properties:
    * `basedir` a string, or an array of strings, as above. (Replaces the `basedir` argument above.)
    * `prefix` a string, or an array of strings, of sub-directory paths to append to the `basedir` path (i.e: 'node_modules').
    * `index` a string, or an array of strings, possible directory index base-names to try (i.e: 'index', or ['index', 'main']).
    * `extension` a string, or an array of strings, possible file extensions to try (i.e: 'js').
    * `transform` a function. Will receive a string as the first argument, which is the current path being created. Return a string, or an array of strings, to make your own modifications to the paths searched. `false` return values will be filtered out of the search.
    * `findAll` a boolean, set to `true` to return all found paths. Default `false`.
    * `directories` a boolean, set to `true` to allow matches on directories. Default `false`.
    * `silent` a boolean, set to `true` to silently fail (don't throw an exception). Default `false`.

**Note:** `basedir` defaults to the directory of the calling method's file path, or `process.cwd()` if that can not be determined.


Internal API
------------

### resolveIt.directoryFromStack([startPath]) ###

Using an error stack, try to determine the calling directory.  If passed the optional *startPath* parameter, use that to determine where to start looking in the stack trace.


### resolveIt.explodePath(path) ###

Takes a `path`, as a string, and explodes it into an array of ascending directories.

~~~js
resolveIt.explodePath('a/b/c'); // => [ 'a/b/c', 'a/b', 'a', '.' ]
~~~

### resolveIt.buildPaths(search, [options]) ###

Does the underlying work of building all possible search paths. `search` and `options` are the same as `resolveIt.sync`'s arguments, with the exception that `options.basedir` is presumed to be defined as a string, or an array of strings. If `options.basedir` is not defined nothing will be returned.

~~~js
resolveIt.buildPaths('d', { 
    basedir: 'a/b',
    extension: 'js',
    prefix: 'node_modules',
    index: 'index'
});
// would generate the following results:
// a/b/d/e
// a/b/d/e.js
// a/b/d/e/index
// a/b/d/e/index.js
// a/b/d/node_modules/e
// a/b/d/node_modules/e.js
// a/b/d/node_modules/e/index
// a/b/d/node_modules/e/index.js
// a/d/e
// a/d/e.js
// a/d/e/index
// a/d/e/index.js
// a/d/node_modules/e
// a/d/node_modules/e.js
// a/d/node_modules/e/index
// a/d/node_modules/e/index.js
// d/e
// d/e.js
// d/e/index
// d/e/index.js
// d/node_modules/e
// d/node_modules/e.js
// d/node_modules/e/index
// d/node_modules/e/index.js
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
