var path = require('path'),
    STACK_LINE_REGEX = /^\s*at\s+([^\s]+)\s+\(([^:]+):(\d+):(\d+)\)$/;

function fileFromStack (startPath) {
    var error = new Error(),
        stack = error.stack.split('\n'),
        selfPath = __filename,
        otherPath;
    
    stack.some(function (line) {
        var isSelf = ~line.indexOf(selfPath),
            isStart = startPath && ~line.indexOf(startPath),
            match;
            
        if (!isSelf && !isStart && (match = STACK_LINE_REGEX.exec(line))) {
            otherPath = match[2];
            return true;
        }
        
        return false;
    });
    
    return otherPath;
}

function directoryFromStack (startPath) {
    return path.dirname(fileFromStack(startPath));
}

module.exports = {
    file: fileFromStack,
    dir: directoryFromStack
};
