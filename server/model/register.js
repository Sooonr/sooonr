var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RegisterSchema = new Schema({
 idUser: Number,
 idEvent: Number
});

module.exports = mongoose.model('Register', RegisterSchema);
