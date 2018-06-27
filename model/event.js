var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventSchema = new Schema({
		creator: { type: String, required: true },
    title: String,
    date: Date,
    description: String,
    adress: String,
    createdAt: { type: Date, default: Date.now },
   	updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    participants: [{type: String}],
		imgUrl: String,
});

module.exports = mongoose.model('Event', EventSchema);
