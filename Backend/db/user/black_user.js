var mongoose = require('mongoose');

var BlackUser = mongoose.Schema({
    userId: {
        type: String,
        unique: true,
        required: true,
        index: true
    }
});

modelBlackUser= null;
db = global.userdb_connection;

db.on('connected', () => {console.log('Mongoose connected to userDB model BlackUser')
    modelBlackUser = db.model('BlackUser', BlackUser);
});
db.on('error', (err) => console.error('Connection error:', err));
db.on('disconnected', () => console.log('Mongoose disconnected'));

//module.exports = global.userdb_connection.model('BlackUser', BlackUser);
module.exports = modelBlackUser;