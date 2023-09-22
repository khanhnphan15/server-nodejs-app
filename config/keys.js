const e = require("express");

if (process.env.NODE_ENV === 'producion') {
    module.exports = require('./prod');
} else {
    module.exports = require('./dev');
}