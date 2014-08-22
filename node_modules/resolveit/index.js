var _ = require('underscore');

_.extend(exports, {
    sync:       require('./sync'),
    cache:      require('./cache'),
    explode:    require('./explode'),
    traverse:   require('./traverse'),
    defaultPackageReader:   require('./package-reader'),
    directoryFromStack:     require('./from-stack').dir,
    fileFromStack:          require('./from-stack').file
});
