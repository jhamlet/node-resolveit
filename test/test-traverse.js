/*globals describe, it */
var traverse = require('../lib/traverse'),
    path = require('path'),
    PATH_SEP = path.sep,
    should = require('should');

describe('resolveIt.traverse()', function () {
        
    it('absolute basedir should produce absolute paths', function () {
        traverse('d/e/f', { basedir: '/a/b/c' }, function (path) {
            path.indexOf(PATH_SEP).should.equal(0);
        });
    });
    
    it('absolute search path should return that path', function () {
        var results = [];
        
        traverse('/a/b/c', function (path) {
            results.push(path);
        });

        results.length.should.equal(1);
        results[0].should.equal('/a/b/c');
    });
        
    it('absolute search path should try indexes and extension', function () {
        var results = [];

        traverse('/a/b/c', {
            index: 'index',
            extension: 'js'
        }, function (path) {
            results.push(path);
        });

        results.
            should.
            eql([
                '/a/b/c',
                '/a/b/c.js',
                '/a/b/c/index',
                '/a/b/c/index.js'
            ]);
    });
    
    it('search: e/f/g, basedir: a/b/c/d', function () {
        var results = [];

        traverse('e/f/g', { basedir: 'a/b/c/d'}, function (path) {
            results.push(path);
        });

        results.
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
        var results = [];

        traverse('b', {
            basedir: 'a',
            extension: 'js',
            prefix: 'node_modules',
            index: 'index'
        }, function (path) { results.push(path); });

        results.
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
        var results = [];

        traverse('c/d',{
            basedir: 'a/b',
            extension: ['js', 'coffee'],
            prefix: 'node_modules',
            index: ['index', 'main']
        }, function (path) { results.push(path); });

        results.
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
