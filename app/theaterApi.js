var Theater = require('./models/theaters');
var Key = require('../keys');
var request = require('request');

//POST new theater
exports.create = function(req,res) {
    new Theater({
      name: req.body.name,
      address: req.body.address,
      city: req.body.city,
      latLong: req.body.latLong,
    }).save(function(){
      res.send(req.body.name +' saved!')
    });
  }
//GET all theaters (2 per page)
exports.listAll = function(req,res) {
    var Page = req.params.page_number * 2;
    if(isNaN(Page)){
      res.send('provide a number for the param or the string "all"');
    }else if(req.params.page_number === 'all'){
      Theater.find(function(err, theaters) {
        if(err){
          res.send(err);
        } else{
          res.send(theaters);
        }
      });
    }else{
      Theater.find({}).skip(req.params.page_number*2).limit(2)
          .exec(function(err,list){
            if(err){
              res.send(err);
            } else{
              res.send(list);
            }
          });
    }
  }
//GET all theaters filtered by city (2 per page)
exports.filterList = function(req,res){
    Theater.find({city:req.params.city_filter}).skip(req.params.page_number*2).limit(2)
        .exec(function(err,list){
          res.send(list);
        })
  }
//GET all theaters nearby using Google maps and places API
exports.nearbyList = function(req,res){
    request('https://maps.googleapis.com/maps/api/geocode/json?key='+Key.googleKey+'&address='+req.params.address+','+req.params.city, function(err,response,body){
      var bodyObj = JSON.parse(body);
      var bodyLat = bodyObj.results[0].geometry.location.lat
      var bodyLng = bodyObj.results[0].geometry.location.lng
    request('https://maps.googleapis.com/maps/api/place/nearbysearch/json?key='+Key.googleKey+'&location='+bodyLat+','+bodyLng+'&radius=1000&types=movie_theater', function(error, response,body){
      res.send(body);
    })
    })
  }
//GET one theater by name
exports.listOne = function(req,res){
    Theater.findOne({name:req.params.theater_name}, function(err, theater){
      if(err){
        console.log(err)
        res.send(err);
      }else{
        res.send(theater);
      }
    })
  }
//UPDATE one theater by name
exports.updateOne = function(req,res){
    Theater.findOne({name:req.params.theater_name}, function(err, theater){
      if(err) {
        res.send(err);
      }
      //update only what you want 
      theater.name = req.body.name===undefined ? theater.name : req.body.name;
      theater.address = req.body.address===undefined ? theater.address : req.body.address;
      theater.city = req.body.city===undefined ? theater.city : req.body.city;
      theater.latLong = req.body.latLong===undefined ? theater.latLong : req.body.latLong;

      theater.save(function(err){
        if(err){
          res.send(err);
        }else{
        res.send(theater.name+' updated!')
        }
      })
    })
  }
//DELETE one theater by name
exports.deleteOne = function(req,res){
    Theater.findOne({name:req.params.theater_name}, function(err, theater) {
      if(err) {
        res.send(err);
      }
      theater.remove(function(){
        res.send(theater.name + ' removed!')
      })
    })
  }