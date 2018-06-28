var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EventsSchema = new Schema({
    creator: {type: Schema.Types.ObjectId, ref: 'Users'},
    title: String,
    date: Date,
    description: String,
    adress: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    deletedAt: { type: Date },
    participants:[
      {type: Schema.Types.ObjectId, ref: 'Users'}
    ]
});

module.exports = mongoose.model('Events', EventsSchema);