const mongoose = require('mongoose');
const Bathroom = mongoose.model('Bathroom');

var fs = require("fs");

function getBathrooms(){
  console.log("\n *STARTING* \n");
  // Get content from file
  var contents = fs.readFileSync("bathrooms.json");
  // Define to JSON type
  var jsonContent = JSON.parse(contents);
  
  return jsonContent;
}

/*

mongoose.connection.db.dropCollection('bathrooms', function (err, result) {
	  console.log("emptying bathrooms collection");
  });
  for (var x in jsonContent) {
	//console.log(jsonContent[x]);
	let newBath = new Bathroom(jsonContent[x]).save(function (err, room, count) {
		console.log("adding default bathrooms");
	});
  }
*/

module.exports = {
  getBathrooms: getBathrooms
}
