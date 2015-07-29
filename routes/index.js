var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index2');
});
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addstudent', function(req, res){

	var db = req.db;

	var firstName = req.body.firstname;
	var lastName = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var status = "student"
	var SID = Math.floor((Math.random()*10000)+1)

	var collection = db.get('usercollection');

	collection.insert({
		name: {
			first: firstName,
			last: lastName
		},
		email: email,
		password: password,
		status: status,
		SID: SID
	}, function(err){

		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to the success page
			res.redirect('/');
		}

	})

})
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addteacher', function(req, res){

	var db = req.db;

	var firstName = req.body.firstname;
	var lastName = req.body.lastname;
	var email = req.body.email;
	var password = req.body.password;
	var school = req.body.school;
	var status = "teacher"
	var classcode = Math.floor((Math.random()*10000)+1)

	var collection = db.get('usercollection');	

	collection.insert({
		name: {
			first: firstName,
			last: lastName
		},
		email: email,
		school: school,
		classcode: classcode,
		password: password,
		status: status
	}, function(err){

		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to the success page
			res.redirect('/');
		}

	})
})
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/login', function(req, res){
	
	var db = req.db;

	var email = req.body.email;
	var password = req.body.password;

	var collection = db.get('usercollection');
	collection.findOne({email: email, password: password},'name email school classcode password status SID',
		function(err,user){
		if(user == null){
			res.render('indexlogerror');
		}
		else{
			if(user.status == "teacher"){
				var first = user.name.first;
				var last = user.name.last;
				var classcode = user.classcode;
				console.log("CLASSCODE IS " + classcode);
				res.render('teacherdash', {first: first, last: last, classcode: classcode})

			}
			else{
			var first = user.name.first;
			var last = user.name.last;
			res.render('studentdash', {first: first, last: last})
			
			
			}
		}


	})
})
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
router.post('/joinclass', function(req, res){
				var db = req.db;

				var collection = db.get('usercollection');


				var code = req.body.classcode;
				collection.findOne({classcode: code}, 'name email school classcode password status SID',
					function(err, fam){
						var teach = fam.name.first;

						res.render('studentdash', {first: first, last: last, teacher: teach});

					})

				


			})
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////
module.exports = router;