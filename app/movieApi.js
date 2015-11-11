var Movie = require('./models/movies');

//POST new movie 
exports.create = function(req,res) {
    new Movie({
      title: req.body.title,
      year: req.body.year,
      releaseDate: req.body.releaseDate,
      overView: req.body.overView,
      posterPath: req.body.posterPath,
    }).save(function(err){
      //catches validation type errors
      if(err) {
        res.send(err);
      }
      res.send(req.body.title + ' saved!')
    });
  }
//GET all movies with pagination
exports.listAll = function(req,res) {
   var Page = req.params.page_number * 2;
    if(isNaN(Page)){
      res.send('provide a number for the param or the string "all"');
    }else if(req.params.page_number === 'all'){
      Movie.find(function(err, movies) {
        if(err){
          res.send(err);
        } else{
          res.send(movies);
        }
      });
    }else{
      Movie.find({}).skip(req.params.page_number*2).limit(2)
          .exec(function(err,list){
            if(err){
              res.send(err);
            } else{
              res.send(list);
            }
          });
    }
  }
//GET all movies based on year
exports.filterList = function(req,res){
    Movie.find({year:req.params.year_filter}).skip(req.params.page_number*2).limit(2)
        .exec(function(err,list){
          res.send(list);
        })
  }
//GET one movie by title
exports.listOne = function(req,res){
    Movie.findOne({title:req.params.movie_title}, function(err, movie){
      if(err){
        res.send(err);
      }else{
        res.send(movie);
      }
    })
  }
//UPDATE one movie by title
exports.updateOne = function(req,res){
    Movie.findOne({title:req.params.movie_title}, function(err, movie){
      if(err) {
        res.send(err);
      }
      //update only what you want 
      movie.title = req.body.title===undefined ? movie.title : req.body.title;
      movie.year = req.body.year===undefined ? movie.year : req.body.year;
      movie.releaseDate = req.body.releaseDate===undefined ? movie.releaseDate : req.body.releaseDate;
      movie.overView = req.body.overView===undefined ? movie.overView : req.body.overView;
      movie.posterPath = req.body.posterPath===undefined ? movie.posterPath : req.body.posterPath;

      movie.save(function(err){
        if(err){
          res.send(err);
        }else{
        res.send(movie.title+' updated!')
        }
      })
    })
  }
//DELETE one movie by title
exports.deleteOne = function(req,res){
    Movie.findOne({title:req.params.movie_title}, function(err, movie) {
      if(err) {
        res.send(err);
      }
      movie.remove(function(){
        res.send(movie.title + ' removed!')
      })
    })
  }