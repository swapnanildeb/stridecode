var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signuptype');
});

router.get('/userlist', function(req, res) {

    var db = req.db;
   
    
    var collection = db.get('usercollection');
   	collection.find({}, function(err, well){
   		console.log(well);
   	});
   	
   	collection.remove({})
	
});

router.get('/demo', function(req, res, next){
	res.render('demo', {title: 'bruh'})

})

router.get('/hello', function(req, res, next){
	res.render('hellostudent', {broh: 'bruh'})

})

module.exports = router;