/*globals describe, it */
var explode = require('../lib/explode'),
    should = require('should');

describe('resolveIt.explode()', function () {
    
    it('a/b/c/d', function () {
        explode('a/b/c/d').
            should.
            eql([
                'a/b/c/d',
                'a/b/c',
                'a/b',
                'a',
                '.'
            ]);
    });
    
    it('/a/b/c/d', function () {
        explode('/a/b/c/d').
            should.
            eql([
                '/a/b/c/d',
                '/a/b/c',
                '/a/b',
                '/a',
                '/'
            ]);
    });
});
