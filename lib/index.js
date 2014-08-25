/**
 * @module resolveIt
 */
exports.sync        = require('./sync');
exports.cache       = require('./cache');
exports.explode     = require('./explode');
exports.traverse    = require('./traverse');
exports.defaultPackageReader = require('./package-reader');
exports.directoryFromStack   = require('./from-stack').dir;
exports.fileFromStack        = require('./from-stack').file;

