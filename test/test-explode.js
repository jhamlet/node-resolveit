/*globals describe, it */
var explode = require('../node_modules/resolveit/explode'),
    should = require('should');

describe('resoliveIt.explode()', function () {
    
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
