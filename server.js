var express = require('express');
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://127.0.0.1:27017/test').connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  console.log('Connection Open')
});

var MovieApi = require('./app/movieApi');
var TheaterApi = require('./app/theaterApi');

var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());

// ROUTES FOR OUR API 
// =============================================================================
var router = express.Router();
app.use('/api', router);

//************use %20 instead of + for space in URL*******

// Endpoint to CREATE new Movie, GET a list of all Movies
router.route('/movies')
  .post(MovieApi.create);

router.route('/movies/list/:page_number')
  .get(MovieApi.listAll);

//Endpoint to GET movie list filter by movie year and page number
router.route('/movies/list/:page_number/:year_filter')
  .get(MovieApi.filterList);
//Endpoint to GET a single movie and UPDATE single movie and DELETE single movie
router.route('/movies/:movie_title')
  .get(MovieApi.listOne)
  .put(MovieApi.updateOne)
  .delete(MovieApi.deleteOne);


//Custom Endpoint to GET nearby theaters 
router.route('/nearby/:city/:address')
  .get(TheaterApi.nearbyList);

// Endpoint to CREATE new Theater
router.route('/theater')
  .post(TheaterApi.create);


//Endpoint to GET a list of all Theaters-no pagination
router.route('/theater/list/:page_number')
  .get(TheaterApi.listAll);

//Endpoint to GET theater list filter by theater city and page number
router.route('/theater/list/:page_number/:city_filter')
  .get(TheaterApi.filterList);

//Endpoint to GET a single theater and UPDATE single theater and DELETE single theater
router.route('/theater/:theater_name')
  .get(TheaterApi.listOne)
  .put(TheaterApi.updateOne)
  .delete(TheaterApi.deleteOne);

var port = process.env.PORT || 3000;

app.listen(port);

console.log('Listening on port '+port+'...');