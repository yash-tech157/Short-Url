const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    required: true,
  },
  shortUrlCode: {
    type: String,
    required: true,
    unique: true,
  },
  clickCount: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
    default: Date.now,
  },
}, { timestamps: true });

module.exports = mongoose.model('Url', urlSchema);
