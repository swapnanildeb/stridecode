var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index2');
});

/*
// GET Hello World page
router.get('/helloworld', function(req, res){
	res.render('helloworld', {title: 'Hello, World'});
});
*/

/* GET Userlist page. */
router.get('/userlist', function(req, res) {

    var db = req.db;
    var collection = db.get('usercollection');
   	collection.find({}, function(err, well){
   		console.log(well);
   	});
   /*
    collection.findOne({"username":"eric"},function(err, username, password){
    	var well = friends;
    	var obj = JSON.parse(friends);
    	console.log(password)

    })*/
    /*
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
*/
});

/* GET New User page. */
router.get('/newuser', function(req, res){
    res.render('newuser', {title: 'Add New User'});
});


router.post('/teacher', function(req, res){
	res.render('teacher-reg', {title: 'Register as a teacher'});
})
router.post('/student', function(req, res){
	res.render('student-reg', {title: 'Register as a student'});
})
router.post('/login', function(req, res){
	res.render('login', {title: 'Login to your STRIDE account'});
})
/* POST to Add User Service */

/*STUDENT ADDITION*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addstudent', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var password = req.body.password;
	var userEmail = req.body.useremail;
	var status = "student";

	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		username : userName,
		password : password,
		email : userEmail,
		status : status
	}, function (err, doc) {

		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to the success page
			res.redirect('/');
		}
	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////

/*TEACHER ADDITION*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/addteacher', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var password = req.body.password;
	var userEmail = req.body.useremail;
	var status = "teacher";

	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		username : userName,
		password : password,
		email : userEmail,
		status : status
	}, function (err, doc) {

		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to the success page
			
			res.redirect('/');
		}
	});
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


/*LOGIN USER*/
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
router.post('/loginUser', function(req, res){
	var db = req.db;
	var collection = db.get('usercollection');

	var username = String(req.body.username);
	var password = String(req.body.password);
	var status = req.body.status1;

	collection.findOne({"username" : username, "password": password, "status": status}, function(err, well){
   		if (well == null){
   			res.render('index', {title: 'STRIDE'})
   		}
   		else 
   			res.render('index', {title: username})
   		console.log(well);
   	});
  // console.log("MATCHED IS " + matched)

/*
	collection.find({"username" : "swapnanil", "password": "leangap", "status": "teacher"}, function(err, well){
   		console.log(well);
   	});
*/
});

/////////////////////////////////////////////////////////////////////////////////////////////////////////////


router.post('/adduser', function(req, res) {

	// Set our internal DB variable
	var db = req.db;

	// Get our form values. These rely on the "name" attributes
	var userName = req.body.username;
	var userEmail = req.body.useremail;

	// Set our collection
	var collection = db.get('usercollection');

	// Submit to the DB
	collection.insert({
		"username" : userName,
		"email" : userEmail
	}, function (err, doc) {
		if (err) {
			// If it failed, return error
			res.send("There was a problem adding the information to the database.");
		}
		else {
			// And forward to the success page
			res.redirect("userlist");
		}
	});
});


module.exports = router;
