var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MovieSchema = new Schema({
  id: Schema.ObjectId,
  title: String,
  year: Number,
  releaseDate: String,
  overView: String,
  posterPath: String,
});

module.exports = mongoose.model('Movie', MovieSchema)
