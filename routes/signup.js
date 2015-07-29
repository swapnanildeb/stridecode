var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('signup');
});

router.get('/userlist', function(req, res) {

    var db = req.db;
   
    
    var collection = db.get('usercollection');
   	collection.find({}, function(err, well){
   		console.log(well);
   	});
   	collection.remove({status : "teacher"})
});



module.exports = router;