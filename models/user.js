const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    countLogin: {type: Number, default: 0},
    isAdmin: { type: Boolean, default: false },    
});

module.exports = mongoose.model('User', UserSchema);