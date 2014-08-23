/*globals describe, it*/

var resolveIt = require('../'),
    nutil = require('util'),
    fmt = nutil.format,
    Path = require('path'),
    should = require('should');

describe('resolveIt.directoryFromStack()', function () {
    
    it('should equal __dirname', function () {
        resolveIt.directoryFromStack().should.equal(__dirname);
    });
    
    it('given start of __filename, should return a mocha directory', function () {
        var here = __filename,
            path = resolveIt.directoryFromStack(here);
            
        path.should.not.equal(__dirname);
        path.should.containEql('mocha');
    });
});

describe('resolveIt.sync()', function () {
    var opts = [
            {index: 'index', extendsion: 'js'},
            { prefix: 'modules', extension: 'js' },
            { prefix: 'modules', extension: 'js', findAll: true },
            { basedir: 'test/a/b/c/d', prefix: 'modules', directories: true },
            {
                basedir: 'test/a/b/c/d',
                prefix: 'modules',
                index: 'package',
                extension: 'json',
                packages: {
                    'package.json': function (pkgpath) {
                        var FS = require('fs');
                        return Path.join(
                            Path.dirname(pkgpath),
                            JSON.parse(FS.readFileSync(pkgpath, 'utf8')).index
                        );
                    }
                }
            },
            {
                basedir: 'test/a/b/c/d',
                prefix: 'modules',
                index: 'package',
                extension: 'json',
                packages: ['package.json']
            }
        ];

    it('search: a/index.js, basedir: test/a/b/c/d', function () {
        var path = resolveIt.sync('a/index.js', 'test/a/b/c/d');
        path.should.equal('test/a/index.js');
    });

    it(fmt('search: a, basdir: test/a/b/c/d, opts: %j', opts[0]), function () {
        var path = resolveIt.sync('a/index.js', 'test/a/b/c/d', opts[0]);
        path.should.equal('test/a/index.js');
    });
    
    it(fmt('search: foo, basedir: test/a/b/c/d, opts: %j', opts[1]), function () {
        var path = resolveIt.sync('foo', 'test/a/b/c/d', opts[1]);
        path.should.equal('test/a/b/c/modules/foo.js');
    });

    it(fmt('search: foo, basedir: test/a/b/c/d, opts: %j', opts[2]), function () {
        var path = resolveIt.sync('foo', 'test/a/b/c/d', opts[2]);
        
        path.length.should.equal(3);
        path.should.containEql('test/a/b/c/modules/foo.js');
        path.should.containEql('test/a/b/modules/foo.js');
        path.should.containEql('test/a/modules/foo.js');
    });
    
    it(fmt('search: b/c, basedir: test/a/b/c/d, opts: %j', opts[3]), function () {
        var path = resolveIt.sync('b/c', opts[3]);
        path.should.equal('test/a/b/c');
    });
    
    it('search: foo-test.js (as required in a/b/c/d/file.js)', function () {
        require('./a/b/c/d/file.js').should.equal(Path.join(__dirname, 'a/foo-test.js'));
    });
    
    it('search: foo.foo should throw an Exception', function () {
        (function () {
            resolveIt.sync('foo.foo');
        }).should.throw();
    });

    it('search: foo.foo, silent: true should not throw an Exception', function () {
        (function () {
            resolveIt.sync('foo.foo', { silent: true });
        }).should.not.throw();
    });

    it(fmt('search: baz, opts: %j', opts[4]), function () {
        var path = resolveIt.sync('baz', opts[4]);
        path.should.equal('test/a/modules/baz/lib/index.js');
    });

    it(fmt('search: baz, opts: %j', opts[5]), function () {
        var path = resolveIt.sync('baz', opts[5]);
        path.should.equal('test/a/modules/baz/lib/index.js');
    });
});

