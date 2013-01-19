/*globals suite, test, testExpected, testExpectedLength, testResults*/

var resolveit = require('resolveit'),
    Path      = require('path');

suite('resolveit', function () {
    
    suite('.explodePath()', function () {
        
        suite('a/b/c/d', function () {
            testExpected(
                resolveit.explodePath('a/b/c/d'),
                [
                    'a/b/c/d',
                    'a/b/c',
                    'a/b',
                    'a',
                    '.'
                ]
            );
        });
        
    });

    suite('.buildPaths()', function () {
        
        test('absolute basedir should produce absolute paths', function () {
            var paths = resolveit.buildPaths('d/e/f', { basedir: '/a/b/c' });
            paths.every(function (path) {
                return path.indexOf(Path.sep) === 0;
            }).should.equal(true);
        });
        
        test('absolute search path should return that path', function () {
            var paths = resolveit.buildPaths('/a/b/c');
            paths.length.should.equal(1);
            paths[0].should.equal('/a/b/c');
        });
        
        suite('search: e/f/g, basedir: a/b/c/d', function () {
            testExpected(
                resolveit.buildPaths('e/f/g', { basedir: 'a/b/c/d'}),
                [
                    'a/b/c/d/e/f/g',
                    'a/b/c/e/f/g',
                    'a/b/e/f/g',
                    'a/e/f/g',
                    'e/f/g'
                ]
            );
            
        });

        suite('search: b, basedir: a, ext: js, prefix: node_modules, index: index', function () {
            testExpected(
                resolveit.buildPaths('b', {
                    basedir: 'a',
                    extension: 'js',
                    prefix: 'node_modules',
                    index: 'index'
                }), [
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
                ]
            );
        });
        
        suite('search: c/d, basedir: a/b, extension: [js, coffee], prefix: node_modules, index: [index, main]', function () {
            testExpected(
                resolveit.buildPaths('c/d',{
                    basedir: 'a/b',
                    extension: ['js', 'coffee'],
                    prefix: 'node_modules',
                    index: ['index', 'main']
                }), [
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
                ]
            );
        });
    });
    
    suite('.sync()', function () {
        
        test('search: a/index.js, basedir: test/a/b/c/d', function () {
            var path = resolveit.sync('a/index.js', 'test/a/b/c/d');
            path.should.equal('test/a/index.js');
        });

        test(
            'search: a, basedir: test/a/b/c/d, index: index, ext: js',
            function () {
                var path = resolveit.sync('a/index.js', 'test/a/b/c/d', {
                        index: 'index',
                        extension: 'js'
                    });
                path.should.equal('test/a/index.js');
            }
        );
        
        test(
            'search: foo, basedir: test/a/b/c/d, prefix: modules, ext: js',
            function () {
                var path = resolveit.sync('foo', 'test/a/b/c/d', {
                        prefix: 'modules',
                        extension: 'js'
                    });
                path.should.equal('test/a/b/c/modules/foo.js');
            }
        );
        
        test(
            'search: foo, basedir: test/a/b/c/d, prefix: modules, ext: js, findAll: true',
            function () {
                var path = resolveit.sync('foo', 'test/a/b/c/d', {
                        prefix: 'modules',
                        extension: 'js',
                        findAll: true
                    });
                
                path.length.should.equal(3);
                path.should.include(
                    'test/a/b/c/modules/foo.js',
                    'test/a/b/modules/foo.js',
                    'test/a/modules/foo.js'
                );
            }
        );
        
        test(
            'search: foo, basedir: test/a/b/c/d, prefix: modules, ext: js, with transform: +\'-test\'',
            function () {
                var path = resolveit.sync('foo', 'test/a/b/c/d', {
                        prefix: 'modules',
                        extension: 'js',
                        transform: function (path) {
                            var ext = Path.extname(path),
                                dirname = Path.dirname(path),
                                basename = Path.basename(path, ext);
                            
                            return Path.join(dirname, basename + '-test' + ext);
                        }
                    });
                
                path.should.equal('test/a/foo-test.js');
            }
        );

        test(
            'search: foo, basedir: test/a/b/c/d, prefix: modules, ext: js, transform: prune c, findAll: true',
            function () {
                var path = resolveit.sync('foo', 'test/a/b/c/d', {
                        prefix: 'modules',
                        extension: 'js',
                        transform: function (path) {
                            return (/c\/modules/.test(path)) ? false : path;
                        },
                        findAll: true
                    });
                
                path.length.should.equal(2);
                path.should.include(
                    'test/a/b/modules/foo.js',
                    'test/a/modules/foo.js'
                );
                path.should.not.include('test/a/b/c/modules/foo.js');
            }
        );
        
        test(
            'search: b/c, basedir: test/a/b/c/d, prefix: modules, directories: true',
            function () {
                var path = resolveit.sync('b/c', {
                        basedir: 'test/a/b/c/d',
                        prefix: 'modules',
                        directories: true
                    });
                
                path.should.equal('test/a/b/c');
            }
        );
    });
});


function testResults (actual, expected) {
    test('All results match expected', function () {
        actual.forEach(function (result, idx) {
            result.should.equal(
                expected[idx],
                'Expected \'' + expected[idx] + '\', but got \'' + result + '\''
            );
        });
    });
}

function testLength (actual, expected) {
    test('Should have ' + expected.length + ' paths', function () {
        actual.length.should.equal(expected.length);
    });
}

function testExpected (actual, expected) {
    testLength(actual, expected);
    testResults(actual, expected);
}