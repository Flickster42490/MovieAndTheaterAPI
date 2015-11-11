var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TheaterSchema = new Schema({
  id: Schema.ObjectId,
  name: String,
  address: String,
  city: String,
  latLong: []
});

module.exports = mongoose.model('Theater', TheaterSchema)
