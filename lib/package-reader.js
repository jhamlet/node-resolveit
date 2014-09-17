var path = require('path');
/**
 * @member resoloveIt.defaultPackageReader
 * @type {Function}
 * @protected
 * @param {String} filepath
 * @returns {String}
 */
function packageReader (filepath) {
    return path.join(
        path.dirname(filepath),
        require(path.resolve(filepath)).main
    );
}

module.exports = packageReader;
