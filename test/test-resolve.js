/*globals suite, test, testExpected, testExpectedLength, testResults*/

var resolve = require('resolve');

suite('resolve', function () {
    
    suite('.explodePath()', function () {
        
        suite('args: a/b/c/d', function () {
            testExpected(
                resolve.explodePath('a/b/c/d'),
                [
                    'a/b/c/d',
                    'a/b/c',
                    'a/b',
                    'a',
                    ''
                ]
            );
        });
        
    });

    suite('.buildPaths()', function () {
        
        suite('args: e/f/g, a/b/c/d', function () {
            testExpected(
                resolve.buildPaths('e/f/g', 'a/b/c/d'),
                [
                    'a/b/c/d/e/f/g',
                    'a/b/c/e/f/g',
                    'a/b/e/f/g',
                    'a/e/f/g',
                    'e/f/g'
                ]
            );
            
        });

        suite('args: b, a, js, node_modules, index', function () {
            testExpected(
                resolve.buildPaths('b', 'a', 'js', 'node_modules', 'index'), 
                [
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
        
        suite('args: c/d, a/b, [js, coffee], node_modules, [index, main]', function () {
            testExpected(
                resolve.buildPaths(
                    'c/d',
                    'a/b',
                    ['js', 'coffee'],
                    'node_modules',
                    ['index', 'main']
                ), [
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
});


function testResults (actual, expected) {
    expected.forEach(function (result, idx) {
        var desc = 'result ' + (idx+1) + ' should be ';
        
        if (typeof result === 'string') {
            desc += '"' + result + '"';
        }
        else {
            desc += result;
        }

        test(desc, function () {
            actual[idx].should.equal(result);
        });
    });
}

function testLength (actual, expected) {
    test('should have ' + expected.length + ' results', function () {
        actual.length.should.equal(expected.length);
    });
}

function testExpected (actual, expected) {
    testLength(actual, expected);
    testResults(actual, expected);
}