const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    googleId: String // Corrected the field name
});

mongoose.model('users', userSchema);
