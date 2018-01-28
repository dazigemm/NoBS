// app.js
const express = require('express');
const app = express();

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// express session
const session = require('express-session');
const sessionOptions = {
	secret: 'super secret',
	resave: true,
	saveUnitialized: true
};
app.use(session(sessionOptions));

//* link db
const ds = require('./datastore.js');
require('./db');
const parseData = require('./parseData.js');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Rating = mongoose.model('Rating');
const Bathroom = mongoose.model('Bathroom');

//*/ set up passport.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

/* ********************* ROUTES *********************** */

app.get('/', function(req, res) {

	//res.send('hello');
	res.render('index', {user: req.user});
	//res.send("hello world");
});

/* ************ User Authentication Stuff *****************/

app.get('/login', function (req, res) {
	res.render('login', {user: req.user});
});

app.post('/login',
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/register' }));

app.get('/register', function(req, res) {
	res.render('register');
});

app.post('/register', function(req, res) {
	//ds.testCreateUser();
	const pw = req.body.password;
	const name = req.body.username;
	User.register(new User({username: name, rating: 0}), pw, function(err, user) {
	 	if (err) {
	 		return res.render('register', {user: user});
	 	}
	 	passport.authenticate('local')(req, res, function () {
	 		res.redirect('/');
	 	});
	});
});

app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});
//********************** Other Routes ******************************/

//*
let ave = function (arr) {
	let sum = 0;
	for (a in arr) {
		sum += a;
	}
	return sum / arr.length;
};
//*/


app.get('/bathrooms', function (req, res) {
	//res.render('bathrooms', {rooms: parseData.getBathrooms()});
	let defaultRooms = parseData.getBathrooms();
	for (var x in defaultRooms) {
		let bRoom = new Bathroom(defaultRooms[x]);
		Bathroom.count({Name: bRoom.Name}, function (err, count) {
			if (count == 0) {
				new Bathroom(bRoom).save(function (err, room, count) {
					console.log("adding default bathrooms");
				});
			}
		});
	}
	Bathroom.find(function(err, rooms, count) {
	 	//console.log(rooms);
	 	res.render('bathrooms', {
	 		rooms: rooms
	 	});
	});
});

app.post('/bathrooms', function (req, res) {
	if (req.user == null) {
		res.redirect("/login");
	}
	else {
		let hasPads = req.body.pads;
		if (hasPads == 'yes') {
			hasPads = true;
		}
		else {
			hasPads = false;
		}
		let handi = req.body.handicap;
		if (handi == 'yes') {
			handi = true;
		}
		else {
			handi = false;
		}
		let review = new Rating({
			stars: req.body.rating,
			comment: req.body.comment,
			user: req.user
		});
		var newBath = new Bathroom({
			Name: req.body.Name,
			Location: req.body.Location,
			rating: [review],
			Info: {
				Gender: req.body.gender,
				roomType: req.body.style,
				handicap: handi,
				pads: hasPads,
				privacy: req.body.privacy
			}
		});
		console.log(newBath);
		newBath.save(function(err, room, count) {
			console.log("New Bathroom Added");
			res.redirect('/bathrooms');
		});
	}
});

app.get('/rate/:slug', function(req, res) {
	const room = req.params.slug;
	Bathroom.findOne({Name: room}, function (err, roomFound) {
		//console.log(roomFound);
		res.render('rate', {room: roomFound});
	});
});

app.post('/rate/:slug', function(req, res) {
	if (req.user == null) {
		res.redirect('/login');
	}
	else { 
		const room = req.params.slug;
		let review = new Rating ({
			stars: req.body.stars,
			comment: req.body.comment,
			user: req.user

		});
		Bathroom.findOneAndUpdate({Name: room}, {$push: {rating: review}}, (err, room, count) => {});
		res.redirect('/bathrooms');
	}
});

app.get('/database', function (req, res) {
	var data = ds.displayAllData();
	res.render('/database', data);
});

app.listen(process.env.PORT || 5000);
console.log('Started server on port 5000');
