var path = require('path');

function packageReader (filepath) {
    return path.join(
        path.dirname(filepath),
        require(filepath).main
    );
}

module.exports = packageReader;
