const mongoose = require('mongoose');

async function connectionDb(mongoUrl) {
 return mongoose.connect(mongoUrl);
}

module.exports = connectionDb;