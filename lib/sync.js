var path          = require('path'),
    fs            = require('fs'),
    isArray       = Array.isArray,
    basename      = path.basename.bind(path),
    existsSync    = fs.existsSync.bind(fs),
    statSync      = fs.statSync.bind(fs),
    traverse      = require('./traverse'),
    stack         = require('./from-stack'),
    fromDir       = stack.dir,
    packageReader = require('./package-reader'),
    CACHE         = require('./cache');

/**
 * @member resolveIt.sync
 * @function
 * @param {String} search the path you are looking for
 * @param {String|Array[String]} [basedir=resolveIt.directoryFromStack()] base
 * directories to search,
 * @param {Object} [opts] an options object
 * @param {String|Array[String]} [opts.basedir=resolveIt.directoryFromStack()]
 * @param {String|Array[String]} [opts.extension]
 * @param {String|Array[String]} [opts.prefix]
 * @param {String|Array[String]} [opts.index]
 * @param {Array[String]|Object} [opts.packages]
 * @param {Boolean} [opts.findAll] return all matching results?
 * @param {Boolean} [opts.directories] match on directories?
 * @param {Boolean} [opts.silent] don't throw an exception when search can't be
 * resolved
 * @returns {String|Array}
 * @throws {Error} if the path can not be resolved (unless opts.silent is true)
 */
function sync (search, basedir, opts) {
    var paths = [], findAll, allowDirs, packages;

    if (typeof basedir === 'object' && !isArray(basedir)) {
        opts = basedir;
        basedir = null;
    }
    
    opts = opts || {};
    
    if (!opts.basedir) {
        opts.basedir = basedir || fromDir(__filename) || process.cwd();
    }

    findAll = opts.findAll;
    allowDirs = opts.directories;
    packages = opts.packages;
    
    if (packages) {
        packages = !isArray(opts.packages) ?
            packages :
            packages.reduce(function (acc, cur) {
                acc[cur] = packageReader;
                return acc;
            }, {});
    }
    
    traverse(search, opts, function (filepath) {
        var name = basename(filepath),
            cached = CACHE[filepath],
            exists, stat, isFile, isDir, matches,
            path;

        if (cached) {
            exists = true;
            isFile = cached.isFile;
            isDir = cached.isDir;
        }
        else if ((exists = existsSync(filepath))) {
            stat = statSync(filepath);
            isFile = stat.isFile();
            isDir = stat.isDirectory();
            CACHE[filepath] = { isFile: isFile, isDir: isDir };
        }
        else {
            CACHE[filepath] = false;
        }

        matches = (allowDirs ? isDir : isFile) || isFile;

        if (matches) {
            path = packages && packages[name] ?
                packages[name](filepath) :
                filepath;
            if (path) {
                paths.push(path);
            }
        }

        return findAll ? false : !!paths.length;
    });

    if (paths.length) {
        return findAll ? paths : paths[0];
    }

    if (!opts.silent) {
        throw new Error('Can not resolve \'' + search + '\'');
    }
}

module.exports = sync;
