const mongoose = require('mongoose');


const newSchema = new mongoose.Schema({
  shorturl: {
    type: String,
    required: true,
    unique: true
  },
  actualurl: {
    type: String,
    required: true
  }
}, { timestamps: true });

const urlModel = mongoose.model('urlModel', newSchema);


module.exports = urlModel;