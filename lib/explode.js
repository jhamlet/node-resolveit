var path = require('path'),
    join = path.join.bind(path),
    PATH_SEP = path.sep;
/**
 * @member resolveIt.explode
 * @type {Function}
 * @protected
 * @param {String} path
 * @returns {Array<String>}
 */
module.exports = function explode (path) {
    var isAbsolute = path.indexOf(PATH_SEP) === 0,
        result;

    result = path.
        split(PATH_SEP).
        reduceRight(function (acc, cur, idx, list) {
            var args = list.slice(0, idx+1);
            args = isAbsolute ? ['/'].concat(args) : args;
            return acc.concat(join.apply(null, args));
        }, []);

    return isAbsolute ? result : result.concat('.');
};
