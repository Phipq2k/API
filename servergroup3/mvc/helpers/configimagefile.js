const fs = require('fs')
module.exports = (filename) => {
    const fd = fs.openSync(filename, 'w')

}