/*globals describe, it */
var buildPaths = require('../node_modules/resolveit/build-paths'),
    path = require('path'),
    PATH_SEP = path.sep,
    should = require('should');

describe('resolveIt.buildPaths()', function () {
        
    it('absolute basedir should produce absolute paths', function () {
        var paths = buildPaths('d/e/f', { basedir: '/a/b/c' });
        paths.every(function (path) {
            return path.indexOf(PATH_SEP) === 0;
        }).should.equal(true);
    });
    
    it('absolute search path should return that path', function () {
        var paths = buildPaths('/a/b/c');
        paths.length.should.equal(1);
        paths[0].should.equal('/a/b/c');
    });
        
    it('search: e/f/g, basedir: a/b/c/d', function () {
        buildPaths('e/f/g', { basedir: 'a/b/c/d'}).
            should.
            eql([
                'a/b/c/d/e/f/g',
                'a/b/c/e/f/g',
                'a/b/e/f/g',
                'a/e/f/g',
                'e/f/g'
            ]);
        
    });

    it('search: b, basedir: a, ext: js, prefix: node_modules, index: index', function () {
        buildPaths('b', {
            basedir: 'a',
            extension: 'js',
            prefix: 'node_modules',
            index: 'index'
        }).
            should.
            eql([
                'a/b',
                'a/b.js',
                'a/b/index',
                'a/b/index.js',
                'a/node_modules/b',
                'a/node_modules/b.js',
                'a/node_modules/b/index',
                'a/node_modules/b/index.js',
                'b',
                'b.js',
                'b/index',
                'b/index.js',
                'node_modules/b',
                'node_modules/b.js',
                'node_modules/b/index',
                'node_modules/b/index.js'
            ]);
    });
    
    it('search: c/d, basedir: a/b, extension: [js, coffee], prefix: node_modules, index: [index, main]', function () {
        buildPaths('c/d',{
            basedir: 'a/b',
            extension: ['js', 'coffee'],
            prefix: 'node_modules',
            index: ['index', 'main']
        }).
            should.
            eql([
                'a/b/c/d',
                'a/b/c/d.js',
                'a/b/c/d.coffee',
                'a/b/c/d/index',
                'a/b/c/d/index.js',
                'a/b/c/d/index.coffee',
                'a/b/c/d/main',
                'a/b/c/d/main.js',
                'a/b/c/d/main.coffee',
                'a/b/node_modules/c/d',
                'a/b/node_modules/c/d.js',
                'a/b/node_modules/c/d.coffee',
                'a/b/node_modules/c/d/index',
                'a/b/node_modules/c/d/index.js',
                'a/b/node_modules/c/d/index.coffee',
                'a/b/node_modules/c/d/main',
                'a/b/node_modules/c/d/main.js',
                'a/b/node_modules/c/d/main.coffee',
                'a/c/d',
                'a/c/d.js',
                'a/c/d.coffee',
                'a/c/d/index',
                'a/c/d/index.js',
                'a/c/d/index.coffee',
                'a/c/d/main',
                'a/c/d/main.js',
                'a/c/d/main.coffee',
                'a/node_modules/c/d',
                'a/node_modules/c/d.js',
                'a/node_modules/c/d.coffee',
                'a/node_modules/c/d/index',
                'a/node_modules/c/d/index.js',
                'a/node_modules/c/d/index.coffee',
                'a/node_modules/c/d/main',
                'a/node_modules/c/d/main.js',
                'a/node_modules/c/d/main.coffee',
                'c/d',
                'c/d.js',
                'c/d.coffee',
                'c/d/index',
                'c/d/index.js',
                'c/d/index.coffee',
                'c/d/main',
                'c/d/main.js',
                'c/d/main.coffee',
                'node_modules/c/d',
                'node_modules/c/d.js',
                'node_modules/c/d.coffee',
                'node_modules/c/d/index',
                'node_modules/c/d/index.js',
                'node_modules/c/d/index.coffee',
                'node_modules/c/d/main',
                'node_modules/c/d/main.js',
                'node_modules/c/d/main.coffee',
            ]);
    });
});
