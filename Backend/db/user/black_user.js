var mongoose = require('mongoose');

var BlackUser = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        index: true
    }
});

module.exports = global.userdb_connection.model('BlackUser', BlackUser);