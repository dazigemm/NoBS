const mongoose = require('mongoose');
//const URLSlugs = require('mongoose-url-slugs');
const passportLocalMongoose = require('passport-local-mongoose');

const User = new mongoose.Schema({
	name: String,
	password: String
});

const Rating = new mongoose.Schema({
	stars: Number,
	review: String
});

const Bathroom = new mongoose.Schema({
	Name: String,
	Location: String,
	rating: Number,
	Info: {
		Gender: String,
		roomType: String,
		handicap: Boolean,
		pads: Boolean
	}
});

User.plugin(passportLocalMongoose);

mongoose.model('User', User);
mongoose.model('Rating', Rating);
mongoose.model('Bathroom', Bathroom);

var uristring = process.env.MONGODB_URI ||
	'mongodb://localhost/nobs';

mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log('ERROR connecting to: ' + uristring + '- ' + err);
	}
	else {
		console.log('Succeeded connected to: ' + uristring);
	}
});
