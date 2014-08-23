var path = require('path'),
    explode = require('./explode'),
    isArray = Array.isArray,
    join = path.join.bind(path),
    normalize = path.normalize.bind(path),
    PATH_SEP = path.sep,
    CACHE = require('./cache'),
    EMPTY = [''],
    currentPath = [],
    currentCallback,
    dirs,
    prefixes,
    indices,
    extensions;

function toArray (val) {
    return isArray(val) ?
        val :
        typeof val !== 'undefined' ? [val] : [];
}

function compilePath (ext) {
    var path = join.apply(null, currentPath),
        result = false;

    path += (ext && '.' + ext) || '';
    path = normalize(path);

    if (CACHE[path] !== false) {
        result = currentCallback(path);
    }
    
    return result;
}

function searchExtensions (index) {
    currentPath[3] = index;
    return extensions.some(compilePath);
}

function searchIndices (prefix) {
    currentPath[1] = prefix;
    return indices.some(searchExtensions);
}

function searchPrefixes (dir) {
    currentPath[0] = dir;
    return prefixes.some(searchIndices);
}

function search () {
    return dirs.some(searchPrefixes);
}
/**
 * @member resolveIt.traverse
 * @type {Function}
 * @protected
 * @param {String} query
 * @param {Object} [opts] an options object
 * @param {String|Array[String]} [opts.basedir]
 * @param {String|Array[String]} [opts.extension]
 * @param {String|Array[String]} [opts.prefix]
 * @param {String|Array[String]} [opts.index]
 * @param {Function} callback
 */
function traverse (query, opts, callback) {
    var isAbsolute = query.indexOf(PATH_SEP) === 0;
    
    if (typeof opts === 'function') {
        callback = opts;
        opts = {};
    }

    currentPath.length = 0;
    currentCallback = callback;
    currentPath[2] = query;

    dirs = isAbsolute ?
        EMPTY :
        toArray(opts.basedir).
            reduce(function (acc, cur) {
                acc.push.apply(acc, explode(cur));
                return acc;
            }, []);

    prefixes = isAbsolute ? EMPTY : EMPTY.concat(toArray(opts.prefix));
    indices = EMPTY.concat(toArray(opts.index));
    extensions = EMPTY.concat(toArray(opts.extension));

    return search();
}

module.exports = traverse;

