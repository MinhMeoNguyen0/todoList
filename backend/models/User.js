const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({

  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('User', UserSchema);
